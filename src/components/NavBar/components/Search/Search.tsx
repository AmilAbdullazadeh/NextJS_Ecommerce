import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { ApiProduct } from '@api';
import { useDebounce } from '@hooks';
import { productDetailsPage } from '@core';

import useStyles from './Search.styles';
import { GET_PRODUCT_BY_NAME } from './api';

export type SearchOption = Pick<ApiProduct, 'name' | 'id'> & {
    __typename: string;
};

const Search: React.FC = () => {
    const MIN_INPUT_LENGTH = 4;
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [getProductsByName, { loading, error, data }] =
        useLazyQuery(GET_PRODUCT_BY_NAME);
    const [productOptions, setProductOptions] = useState<SearchOption[]>([]);

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'search-input',
        freeSolo: true,
        options: productOptions,
        getOptionLabel: (option: SearchOption) => option.name,
        onInputChange: (
            event: React.ChangeEvent<Record<string, never>>,
            value: string
        ) => setSearchTerm(value),
    });

    useEffect(() => {
        if (!debouncedSearchTerm) {
            setProductOptions([]);
        } else if (debouncedSearchTerm.length >= MIN_INPUT_LENGTH) {
            getProductsByName({ variables: { name: debouncedSearchTerm } });
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        data && setProductOptions(data.results);
    }, [data]);

    // if (loading) return <p>Loading ...</p>;
    // if (error) return `Error! ${error}`;

    return (
        <div
            className={classes.search}
            {...getRootProps()}
            data-testid="autocomplete"
        >
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                {...getInputProps()}
                placeholder="Search..."
                role="combobox"
                aria-expanded
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{
                    'aria-label': 'search',
                    'data-testid': 'search-input',
                }}
                autoFocus
            />
            {groupedOptions.length > 0 ? (
                <List
                    dense
                    className={classes.optionsList}
                    {...getListboxProps()}
                >
                    {groupedOptions.map((option, index) => (
                        <ListItem
                            {...getOptionProps({ option, index })}
                            key={option.id}
                        >
                            <Link href={productDetailsPage(option.id)}>
                                <a className={classes.searchOption}>
                                    {option.name}
                                </a>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            ) : null}
        </div>
    );
};

export default Search;
