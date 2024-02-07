import Observable from "../../shared/observable/observable.ts";

export interface ConfirmationModalState {
  open: boolean;
  confirmed: boolean;
}

export class ConfirmationModal extends Observable<ConfirmationModalState> {
  public loadModal(cb: (state: ConfirmationModalState) => void) {
    this.subscribe(cb);
  }

  public openModal() {
    this.setValue({ open: true, confirmed: false });
  }

  public closeModal() {
    this.setValue({ open: false, confirmed: false });
  }

  public isOpen() {
    const state = this.getValue();
    return state.open;
  }

  public setConfirm(value: boolean) {
    const currentState = this.getValue();
    this.setValue({...currentState, confirmed: value});
  }

  public isConfirmed() {
    const state = this.getValue();
    return state.confirmed;
  }
}
