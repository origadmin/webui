import PageContainer from "@/components/PageContainer";

export default function ProfilePage() {
  return (
    <PageContainer>
      <div className='p-4'>
        <h1 className='text-2xl font-bold'>User Profile</h1>
        <p className='text-muted-foreground'>
          This is the placeholder for the user profile page. Users will be able to view and manage their personal information here.
        </p>
      </div>
    </PageContainer>
  );
}
