export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'color',
      title: 'Color Hex/Name',
      type: 'string',
      description: 'Used for frontend styling (e.g. brand-blue)'
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string'
    }
  ]
}
