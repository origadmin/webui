import AvatarStatusDemo from "@/pages/examples/basic/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer/index";

export default function BasicPage() {
  return (
    <PageContainer>
      <div className='container mx-auto py-4'>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Form Example</CardTitle>
            <CardDescription>Fill out the form below with your information.</CardDescription>
          </CardHeader>
          <CardContent>
            <AvatarStatusDemo />
          </CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
