const project = {
  name: "project",
  title: " Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: {
        required: () => {
          (): any;
          new (): any;
          min: {
            (arg0: number): {
              (): any;
              new (): any;
              max: { (arg0: number): any; new (): any };
            };
            new (): any;
          };
        };
      }) => Rule.required().min(1).max(32),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "publichedAt",
      title: "Publiched at",
      type: "date",
    },

    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        { type: "reference", to: { type: "category" } },
        // { type: "category" },
      ],
      // to: { type: "categories" },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  // preview: {
  //   select: {
  //     title: "title",
  //     author: "author.name",
  //     media: "image",
  //   },
  //   prepare(selection: { author: any }) {
  //     const { author } = selection;
  //     return Object.assign({}, selection, {
  //       subtitle: author && `by ${author}`,
  //     });
  //   },
  // },
  prepare(selection: Record<string, any>) {
    const { author } = selection;
    return {
      ...selection,
      subtitle: author && `by ${author}`,
    };
  },
};

export default project;
