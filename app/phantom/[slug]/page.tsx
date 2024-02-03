"use client";
import { useEffect, useState } from "react";

import arrowLeftCircle from "react-useanimations/lib/arrowLeftCircle";
import Link from "next/link";
import loading2 from "react-useanimations/lib/loading2";
import UseAnimations from "react-useanimations";

import { IPhantom } from "app/types";

const loadPhantomFromLocalStorage = (id: string): IPhantom | null => {
  const phantomDataRaw = localStorage.getItem("phantoms");
  if (phantomDataRaw) {
    const phantomData = JSON.parse(phantomDataRaw);
    return phantomData.find((item: IPhantom) => item.id === id);
  }
  return null;
};

export default function PhantomPage({ params }: { params: { slug: string } }) {
  const [phantom, setPhantom] = useState<IPhantom | null>(null);

  useEffect(() => {
    const phantomItem = loadPhantomFromLocalStorage(params.slug);
    setPhantom(phantomItem);
  }, [params.slug]);

  if (phantom === null) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <UseAnimations animation={loading2} autoplay={true} size={56} />
      </div>
    );
  }

  const { name, script, launchType, manifest, repeatedLaunchTimes } = phantom;

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
        <p className="text-gray-700 dark:text-gray-300">{script}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Launch Type:
          <span className="font-semibold">{launchType}</span>
        </p>
        <h2 className="text-lg font-bold">Categories</h2>
        <ul className="list-disc pl-5">
          {manifest.tags.categories.map((category) => (
            <li key={category} className="text-gray-600 dark:text-gray-400">
              {category}
            </li>
          ))}
        </ul>
        {repeatedLaunchTimes && (
          <>
            <h2 className="text-lg font-bold">Repeated Launch Times</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {repeatedLaunchTimes.simplePreset}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
