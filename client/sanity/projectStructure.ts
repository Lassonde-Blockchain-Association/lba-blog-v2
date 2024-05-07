const projectStructure = (S: any) => {
  // generate a new generic list
  return S.list()
    .title("Content")
    .items([
      S.listItem().title("All").child(
        /* Create a list of all posts */
        S.documentList().title("All Posts").filter('_type == "project"')
      ),
      S.listItem()
        .title("Filtered Projects")
        .child(
          S.list()
            .title("Filters")
            // array of project
            .items([
              // create new custom list item
              S.listItem()
                .title("Projects By Category")
                .child(
                  S.documentTypeList("category")
                    .title("Projects by Category")
                    .child((categoryId: any) =>
                      S.documentList()
                        .title("Projects")
                        .filter(
                          `_type == "project" && $categoryId in categories[]._ref`
                        )
                        .params({ categoryId })
                    )
                ),
              S.listItem()
                .title("Projects By Author")
                .child(
                  S.documentTypeList("author")
                    .title("Projects by Author")
                    .child((authorId: any) =>
                      S.documentList()
                        .title("Projects")
                        .filter(
                          `_type == "project" && $authorId == author._ref`
                        )
                        .params({ authorId })
                    )
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems(),
    ]);
};

export default projectStructure;
