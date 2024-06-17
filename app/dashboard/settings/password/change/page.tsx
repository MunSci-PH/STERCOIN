import ChangePassword from "@/components/auth/changePassword";

export default async function Dashboard() {
  return (
    <>
      <main className="container mx-auto flex flex-1 px-4 text-center">
        <div className="m-auto">
          <div className="my-12 flex w-96 flex-col items-center rounded-xl bg-base-100 p-10">
            <p className="mb-8 text-center font-sans text-4xl font-bold">
              Change Password
            </p>
            <ChangePassword />
          </div>
        </div>
      </main>
    </>
  );
}
