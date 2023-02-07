import { FormControl } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

export const AsyncSelect = ({
  field,
  form: { setFieldValue },
  groupedOptions,
}) => {
  const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : '';
  };

  return (
    <FormControl>
      <Select
        classNames={{
          control: state =>
            state.isFocused ? 'border-red-600' : 'border-grey-300',
        }}
        chakraStyles={{
          option: (baseStyles, state) => ({
            ...baseStyles,
            color: state.isFocused ? '#FF6596' : 'black',
            fontWeight: state.isFocused ? 600 : 400,
          }),
          menu: baseStyles => ({
            ...baseStyles,
            boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
          }),
        }}
        selectedOptionColor="grey"
        variant="flushed"
        defaultValue={defaultValue(groupedOptions, field.value)}
        placeholder="Select a category"
        options={groupedOptions}
        onChange={option => setFieldValue(field.name, option.value)}
      />
    </FormControl>
  );
};
