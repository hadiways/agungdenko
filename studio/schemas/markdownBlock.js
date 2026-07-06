export default {
  name: 'markdownBlock',
  title: 'Markdown Content',
  type: 'object',
  fields: [
    {
      name: 'markdownText',
      title: 'Markdown Text',
      type: 'text',
      rows: 10,
      description: 'Write raw Markdown formatting here (lists, tables, quotes, etc.)'
    }
  ]
}
