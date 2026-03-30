import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    graph: collection({
      label: 'Graph Nodes',
      slugField: 'title',
      path: 'src/content/graph/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        nodeType: fields.select({
          label: 'Node Type',
          options: [
            { label: 'Project', value: 'project' },
            { label: 'Idea', value: 'idea' },
            { label: 'Writing', value: 'writing' },
            { label: 'Education', value: 'education' },
            { label: 'Experience', value: 'experience' },
            { label: 'Hackathon', value: 'hackathon' },
            { label: 'MBA', value: 'mba' },
            { label: 'Leadership', value: 'leadership' },
          ],
          defaultValue: 'idea',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Placeholder', value: 'placeholder' },
            { label: 'Published', value: 'published' },
          ],
          defaultValue: 'placeholder',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        related: fields.array(fields.text({ label: 'Related Node (filename)' }), {
          label: 'Related Nodes',
          itemLabel: (props) => props.value || 'New Link',
        }),
        keywords: fields.array(fields.text({ label: 'Keyword' }), {
          label: 'Keywords',
          itemLabel: (props) => props.value || 'New Keyword',
        }),
        // Social metadata for 'Ghostless Ghost'
        linkedinPostContent: fields.text({ label: 'LinkedIn Post Content', multiline: true }),
        linkedinPostId: fields.text({ label: 'LinkedIn Post ID (stored)' }),
        isPublished: fields.checkbox({ label: 'Published to Site', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md'
        }),
      },
    }),
  },
});
