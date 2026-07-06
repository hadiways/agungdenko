export default {
  name: 'chart',
  title: 'Chart / Grafik',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Chart Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'chartType',
      title: 'Chart Type',
      type: 'string',
      options: {
        list: [
          { title: 'Bar Chart (Grafik Batang)', value: 'bar' },
          { title: 'Line Chart (Grafik Garis)', value: 'line' },
          { title: 'Pie Chart (Grafik Lingkaran)', value: 'pie' }
        ]
      },
      initialValue: 'bar',
      validation: Rule => Rule.required()
    },
    {
      name: 'data',
      title: 'Chart Data',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dataPoint',
          title: 'Data Point',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'value', title: 'Value / Nilai', type: 'number', validation: Rule => Rule.required() }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ]
}
