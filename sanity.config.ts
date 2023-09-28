import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from './sanity/schemas';

const config = defineConfig({
    projectId: 'f8y83dz4',
    dataset: 'production',
    title: 'Three Story Studio',
    apiVersion: '2023-06-11',
    basePath: '/admin',
    plugins: [deskTool()],
    schema: { types: schemas }
})

export default config