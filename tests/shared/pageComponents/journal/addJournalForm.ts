import { BasePageComponent } from "../basePageComponent";
import { PuppeteerPageDriver } from "../../driver/pupeteerPageDriver";

type AddJournalFormElements = {
  titleInput: { selector: string };
  submitBtn: { selector: string };
};

export class AddJournalFormComponent extends BasePageComponent<AddJournalFormElements> {
  constructor(
    protected pageDriver: PuppeteerPageDriver,
    protected componentConfig: AddJournalFormElements,
  ) {
    super(pageDriver, componentConfig);
  }

  async addAndSubmit({ title }: { title: string }) {
    await this.waitAndType('titleInput', title);
    await this.waitAndClick('submitBtn');
  }
}
