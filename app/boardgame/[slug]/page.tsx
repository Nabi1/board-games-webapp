"use client";
import { useEffect, useState } from "react";

import arrowLeftCircle from "react-useanimations/lib/arrowLeftCircle";
import Link from "next/link";
import loading2 from "react-useanimations/lib/loading2";
import UseAnimations from "react-useanimations";

import { BroadGameType } from "app/types";

const loadboardGameFromLocalStorage = (id: string): BroadGameType | null => {
  const boardGameDataRaw = localStorage.getItem("boardGames");
  if (boardGameDataRaw) {
    const boardGameData = JSON.parse(boardGameDataRaw);
    return boardGameData.find((item: BroadGameType) => item.id === id);
  }
  return null;
};

export default function BoardGamePage({
  params,
}: {
  params: { slug: string };
}) {
  const [boardGame, setboardGame] = useState<BroadGameType | null>(null);

  useEffect(() => {
    const boardGameItem = loadboardGameFromLocalStorage(params.slug);
    setboardGame(boardGameItem);
  }, [params.slug]);

  if (boardGame === null) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <UseAnimations animation={loading2} autoplay={true} size={56} />
      </div>
    );
  }

  const { name, manifest } = boardGame;

  return (
    <main className="flex min-h-screen justify-center items-center px-4">
      <div className="p-8 bg-white rounded-xl dark:bg-gray-800 shadow-xl space-y-4 w-full max-w-md sm:max-w-lg mx-auto">
        <Link href="/">
          <UseAnimations
            animation={arrowLeftCircle}
            autoplay={true}
            size={30}
          />
        </Link>
        <h1 className="text-xl font-bold">{name}</h1>
        <h2 className="text-lg font-bold">Categories</h2>
        <ul className="list-disc pl-5">
          {manifest.tags.categories.map((category) => (
            <li key={category} className="text-gray-600 dark:text-gray-400">
              {category}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400">Next party in</p>
      </div>
    </main>
  );
}
