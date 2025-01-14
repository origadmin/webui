import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb';
import { Content } from '@/components/content';
import { PinInput, PinInputField } from '@/components/custom/pin-input';
import { Search } from '@/components/search';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '@/components/user-nav';
import { useState } from 'react';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ThemeSwitch from "@/components/layout/Theme/theme-switch";

export default function ExtraComponents() {
  const items = [{ title: 'Extra Components', href: '/extra-components' }, { title: 'Breadcrumb' }].map(
    ({ href, title }) => (
      <BreadcrumbItem key={title}>
        {href ? (
          <Link
            className='text-muted-foreground underline decoration-muted-foreground decoration-dashed underline-offset-4 hover:text-foreground hover:decoration-solid'
            to={href}
          >
            {title}
          </Link>
        ) : (
          <span className='text-muted-foreground'>{title}</span>
        )}
      </BreadcrumbItem>
    ),
  );

  const [pinInput, setPinInput] = useState('');

  return (
    <Content>
      {/* ===== Top Heading ===== */}
      <Content.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Content.Header>

      {/* className='space-y-4' */}
      <Content.Body className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Extra Components</h1>
        </div>
        <h2 className='text-lg font-bold md:text-xl'>Breadcrumbs</h2>
        <Breadcrumb separator={<ChevronRight size={18} />}>{items}</Breadcrumb>
        <Breadcrumb>{items}</Breadcrumb>

        <Separator />

        <h2 className='text-lg font-bold md:text-xl'>Pin Input</h2>
        <div className='flex flex-col gap-12 lg:flex-row'>
          <div className='flex-1'>
            <h3 className='mb-2 font-medium'>Uncontrolled</h3>
            <Tabs defaultValue='preview'>
              <TabsList>
                <TabsTrigger value='preview'>Preview</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>
              <TabsContent value='preview'>
                <div className='flex min-h-56 items-center justify-center rounded border'>
                  <PinInput
                    className='flex h-10 space-x-4'
                    onComplete={(str) => console.log('completed', str)}
                    autoFocus
                  >
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                    <Separator orientation='vertical' />
                    <PinInputField component={Input} />
                    <PinInputField component={Input} />
                  </PinInput>
                </div>
              </TabsContent>
              <TabsContent value='code'>
                <SyntaxHighlighter language='tsx' style={nord} wrapLines wrapLongLines>
                  {`<PinInput
  className='flex h-10 space-x-4'
  defaultValue=''
  onComplete={(str) => 
    console.log('completed', str)
  }  
  autoFocus
>
  <PinInputField component={Input} />
  <PinInputField component={Input} />
  <Separator orientation='vertical' />
  <PinInputField component={Input} />
  <PinInputField component={Input} />
</PinInput>
`}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </div>
          <div className='flex-1'>
            <h3 className='mb-2 font-medium'>Controlled</h3>
            <Tabs defaultValue='preview'>
              <TabsList>
                <TabsTrigger value='preview'>Preview</TabsTrigger>
                <TabsTrigger value='code'>Code</TabsTrigger>
              </TabsList>
              <TabsContent value='preview'>
                <div className='flex min-h-56 items-center justify-center rounded border'>
                  <PinInput
                    className='flex h-10 space-x-4'
                    value={pinInput}
                    onChange={setPinInput}
                    onComplete={(str) => console.log('completed', str)}
                  >
                    {Array.from({ length: 4 }, (_, i) => (
                      <PinInputField key={i} component={Input} />
                    ))}
                  </PinInput>
                </div>
              </TabsContent>
              <TabsContent value='code'>
                <SyntaxHighlighter language='tsx' style={nord} wrapLines wrapLongLines>
                  {`function ControlledPinInput() {
  const [pinInput, setPinInput] = useState('');

  return (
    <PinInput
      className='flex h-10 space-x-4'
      value={pinInput}
      onChange={setPinInput}
      onComplete={(str) =>console.log('completed', str)}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <PinInputField key={i} component={Input} />
      ))}
    </PinInput>
  )
}`}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Content.Body>
    </Content>
  );
}
