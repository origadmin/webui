function autoGenKeyword(str: string) {
  return str
    .replace(/^\//, "") // Remove the beginning /
    .replace(/\//g, ":") // Replace the subsequent / as :
    .replace(/:+/g, ":"); // Merge multiple colons
}

export { autoGenKeyword };
