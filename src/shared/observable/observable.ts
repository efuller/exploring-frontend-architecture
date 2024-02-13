type Observer<T> = (value: T) => void;

export default class Observable<T> {
  value : T;
  observers : Observer<T>[] = []

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue() {
    return this.value;
  }

  setValue(newValue : T) {
    this.value = newValue;
    this.notify();
  }

  subscribe(observer: Observer<T>) {
    this.observers.push(observer);
    this.notify();
  }

  notify() {
    this.observers.forEach(observer => {
      observer(this.value)
    });
  }
}