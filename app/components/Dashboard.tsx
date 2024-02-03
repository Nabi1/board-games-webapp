import { SideBar } from "./SideBar/SideBar";
import { ResetButton } from "./ResetButton";
import { List } from "./BroadGame/List/List";

export function Dashboard() {
  return (
    <main className="w-full flex min-h-screen flex-col mx-auto  md:max-w-6xl gap-6 my-20 p-4">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <ResetButton />
      <div className="flex gap-8 flex-col md:flex-row z-10 text-sm">
        <SideBar />
        <List />
      </div>
    </main>
  );
}
