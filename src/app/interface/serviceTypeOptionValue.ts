export class ServiceTypeOptionValue {
    id_attr_val: number;
    name: string;
    protected selected = false;

    constructor(id_attr_val: number, name: string) {
        this.id_attr_val = id_attr_val;
        this.name = name;
    }

    isSelected(): boolean {
        return this.selected === true;
    }

    setSelected(flag: boolean): ServiceTypeOptionValue {
        this.selected = flag;
        return this;
    }
}
