import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  if (Math.floor(diffInDays) >= 30) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  } else if (Math.floor(diffInDays) === 1) {
    return `${Math.floor(diffInDays)} day ago`;
  } else if (Math.floor(diffInDays) > 1) {
    return `${Math.floor(diffInDays)} days ago`;
  } else if (Math.floor(diffInHours) >= 1) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (Math.floor(diffInMinutes) >= 1) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else {
    return "Just now";
  }
};
export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
