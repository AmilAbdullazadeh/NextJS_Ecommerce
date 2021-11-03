import { gql } from '@apollo/client';

export const GET_FRONT_PAGE_PHONES = gql`
    query getFrontPagePhones {
        results: phones {
            id
            name
            ratingValue
            reviewCount
            price
            availability
            description
            image
        }
    }
`;
