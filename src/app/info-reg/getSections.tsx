import supabase from "@/utils/supabase";
import { useEffect } from "react";

export default function getSections({ sectionList }: { sectionList: any }) {
  const [sectionList, setSectionList] = useState<any>([]);

  useEffect(() => {
    setSectionList(serverList);
  }, [serverList]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => setSectionList((posts: any) => [...posts, payload.new])
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverList]);

  return <pre></pre>;
}
