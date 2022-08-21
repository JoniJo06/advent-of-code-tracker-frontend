/** @format */

import * as React from 'react';
import { useAutocomplete, AutocompleteGetTagProps } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { Root, Label, InputWrapper, Listbox } from './SearchSelectBox.styles';

import { useEffect } from 'react';

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
	label: string;
}

const Tag = (props: TagProps) => {
	const { label, onDelete, ...other } = props;
	return (
		<div {...other}>
			<span>{label}</span>
			<CloseIcon onClick={onDelete} />
		</div>
	);
};

const StyledTag = styled(Tag)<TagProps>(
	({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

type props = {
	setValue: Function;
	values: string[];
	title: string;
	multiple?: boolean;
};

const CustomizedHook: React.FC<props> = ({ setValue, values, title, multiple }) => {
	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getTagProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		value,
		focused,
		setAnchorEl,
	} = useAutocomplete({
		id: 'customized-hook-demo',
		multiple,
		options: values,
		getOptionLabel: (option) => option,
	});

	useEffect(() => {
		setValue(value);
	}, [value]);

	return (
		<Root>
			<div {...getRootProps()}>
				<Label {...getInputLabelProps()}>{title}</Label>
				<InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
					{value && Array.isArray(value) && value.map((option: string, index: number) => <StyledTag label={option} {...getTagProps({ index })} />)}
					<input {...getInputProps()} />
				</InputWrapper>
			</div>
			{groupedOptions.length > 0 ? (
				<Listbox {...getListboxProps()}>
					{(groupedOptions as typeof values).map((option: string, index: number) => (
						<li {...getOptionProps({ option, index })}>
							<span>{option}</span>
							<CheckIcon fontSize='small' />
						</li>
					))}
				</Listbox>
			) : null}
		</Root>
	);
};

export default CustomizedHook;
