import { sql } from '@vercel/postgres';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import { get } from '@vercel/edge-config';

export async function createProject(name: string, description: string) {
  try {
    const result = await sql`
      INSERT INTO projects (name, description)
      VALUES (${name}, ${description})
      RETURNING id;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function cacheProjectData(key: string, data: any) {
  try {
    await kv.set(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching project data:', error);
    throw error;
  }
}

export async function uploadProjectImage(file: File) {
  try {
    const { url } = await put(file.name, file, {
      access: 'public',
    });
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function getFeatureFlags() {
  try {
    const flags = await get('featureFlags');
    return flags;
  } catch (error) {
    console.error('Error getting feature flags:', error);
    throw error;
  }
}