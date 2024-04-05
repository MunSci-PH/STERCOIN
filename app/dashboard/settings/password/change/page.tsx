import ChangePassword from "@/components/auth/changePassword";

export default async function Dashboard() {
  return (
    <>
      <main className="flex-1 flex container mx-auto text-center px-4">
        <div className="m-auto">
          <div className="flex flex-col items-center my-12 bg-base-100 p-10 rounded-xl w-96">
            <p className="text-center text-4xl font-sans font-bold mb-8">
              Change Password
            </p>
            <ChangePassword />
          </div>
        </div>
      </main>
    </>
  );
}
