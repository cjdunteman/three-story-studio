import { defineConfig, isDev } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './sanity/schemas';
import { media } from 'sanity-plugin-media';

const config = defineConfig({
    projectId: 'f8y83dz4',
    dataset: 'production',
    title: 'Three Story Studio',
    apiVersion: '2023-06-11',
    basePath: '/admin',
    plugins: isDev
        ? [deskTool(), media(), visionTool()]
        : [deskTool(), media()],
    schema: { types: schemas }
})

export default config