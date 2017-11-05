import {ServiceTypeOptionValue} from './serviceTypeOptionValue';

export class ServiceTypeOption {
    id_attribute: number;
    name: string;
    private values: ServiceTypeOptionValue[] = [];
    private selected_value: ServiceTypeOptionValue = null;

    constructor(id_attribute: number, name: string) {
        this.id_attribute = id_attribute;
        this.name = name;
    }

    getValues(): Array<ServiceTypeOptionValue> {
        return this.values;
    }

    addValue(value: ServiceTypeOptionValue) {
        this.values.push(value);
    }

    getSelectedValue(): ServiceTypeOptionValue | null {
        return this.selected_value;
    }

    private getValue(id_attr_val: number): ServiceTypeOptionValue {
        return this.getValues().filter(value => value.id_attr_val === id_attr_val)[0];
    }

    setSelectedValue(value_id: number): void {
        if (this.getSelectedValue()) {
            this.getSelectedValue().setSelected(false);
        }
        this.selected_value = this.getValue(value_id).setSelected(true);
    }
}
