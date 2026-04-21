"use server";

import { getDynamicImage, getDynamicImages } from "@/lib/pexels";

export async function fetchCategoryImage(categoryName: string) {
  return await getDynamicImage(categoryName);
}

export async function fetchCategoryImages(categoryName: string, limit: number = 5, page: number = 1) {
  return await getDynamicImages(categoryName, limit, page);
}


