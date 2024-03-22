let instance: SelectedCategorySingleton;
let globalSelectedCategory: string = "";

class SelectedCategorySingleton {
  private constructor() {}

  public static getSelectedCategory() {
    if (instance == undefined) {
      instance = this;
    }
    return globalSelectedCategory;
  }

  public static setSelectedCategory(newCategory: string) {
    globalSelectedCategory = newCategory;
  }

  public static resetSelectedCategory() {
    globalSelectedCategory = "";
  }
}

export default SelectedCategorySingleton;
