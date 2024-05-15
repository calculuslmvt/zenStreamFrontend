
import VideoPlayer from "@/components/video-player/video-player";
import Image from "next/image";

export default function Home() {

  return (
    <div className="flex gap-2 p-2">
      <VideoPlayer url="https://www.youtube.com/watch?v=MirzFk_DSiI"/>
      <VideoPlayer url="https://www.youtube.com/watch?v=mvFTeAVMmAg"/>
      <VideoPlayer url="https://www.youtube.com/watch?v=fMtbrKhXMWc"/>
    </div>
  );
}
