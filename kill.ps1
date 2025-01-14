# 检查是否提供了端口号参数
if (-not $args -or $args.Length -ne 1) {
    Write-Output "Usage: kill-port-process.ps1 <port>"
    exit 1
}

# 获取端口号参数
$port = $args[0]

# 查找占用指定端口的进程ID
$tcpConnections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($tcpConnections) {
    $processIds = $tcpConnections | Where-Object { $_.State -eq 'Listen' } | Select-Object -ExpandProperty OwningProcess -Unique

    if ($processIds) {
        foreach ($processId in $processIds) {
            try {
                Stop-Process -Id $processId -Force
                Write-Output "Terminated process with PID ${processId}."
            } catch {
                Write-Output "Failed to terminate process with PID ${processId}: $_"
            }
        }
    } else {
        Write-Output "No process is using port $port in 'Listen' state."
    }
} else {
    Write-Output "No process is using port $port."
}
