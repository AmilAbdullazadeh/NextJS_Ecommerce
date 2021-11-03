import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles(
    ({ palette, spacing, breakpoints, transitions, shape, zIndex }) => ({
        search: {
            position: 'relative',
            borderRadius: shape.borderRadius,
            backgroundColor: alpha(palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(palette.common.white, 0.25),
            },
            marginRight: spacing(2),
            marginLeft: 0,
            width: '100%',
            [breakpoints.up('sm')]: {
                marginLeft: spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: palette.secondary.main,
        },
        inputRoot: {
            color: palette.secondary.main,
        },
        inputInput: {
            padding: spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${spacing(4)}px)`,
            transition: transitions.create('width'),
            width: '100%',
            [breakpoints.up('md')]: {
                width: '100ch',
            },
            [breakpoints.down('md')]: {
                width: '50ch',
            },
            [breakpoints.down('sm')]: {
                width: '20ch',
            },
        },
        optionsList: {
            width: '100%',
            margin: 0,
            padding: 0,
            zIndex: zIndex.appBar,
            position: 'absolute',
            listStyle: 'none',
            backgroundColor: palette.background.paper,
            overflow: 'auto',
            maxHeight: 200,
            border: `1px solid ${alpha(palette.common.black, 0.25)}`,
            '& li[data-focus="true"]': {
                backgroundColor: palette.text.secondary,
                color: 'white',
                cursor: 'pointer',
            },
            '& li:active': {
                backgroundColor: palette.text.secondary,
                color: 'white',
            },
        },
        searchOption: {
            color: palette.text.primary,
            textDecoration: 'none',
            fontSize: 18,
        },
    })
);

export default useStyles;
