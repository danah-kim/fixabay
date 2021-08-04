import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import tw from 'twin.macro';

const CustomStyles = createGlobalStyle`
  ${normalize}
  
  body {
    ${tw`antialiased`}
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  
  .ReactVirtualized__Masonry__innerScrollContainer {
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 0px) and (max-width: 755px) {
      width: 504px !important;
    }
    @media (min-width: 756px) and (max-width: 1007px) {
      width: 756px !important;
    }
    @media (min-width: 1008px) and (max-width: 1259px) {
      width: 1008px !important;
    }
    @media (min-width: 1260px) and (max-width: 1511px) {
      width: 1260px !important;
    }
    @media (min-width: 1512px) and (max-width: 1763px) {
      width: 1512px !important;
    }
    @media (min-width: 1764px) and (max-width: 2015px) {
      width: 1764px !important;
    }
    @media (min-width: 2016px) and (max-width: 2267px) {
      width: 2016px !important;
    }
    @media (min-width: 2268px) and (max-width: 2519px) {
      width: 2268px !important;
    }
    @media (min-width: 2520px) and (max-width: 2771px) {
      width: 2520px !important;
    }
    @media (min-width: 2772px) and (max-width: 3023px) {
      width: 2772px !important;
    }
    @media (min-width: 3024px) and (max-width: 3275px) {
      width: 3024px !important;
    }
    @media (min-width: 3276px) and (max-width: 3527px) {
      width: 3276px !important;
    }
    @media (min-width: 3528px) and (max-width: 3779px) {
      width: 3528px !important;
    }
    @media (min-width: 3780px) and (max-width: 4031px) {
      width: 3780px !important;
    }
    @media (min-width: 4032px) and (max-width: 4283px) {
      width: 4032px !important;
    }
    @media (min-width: 4284px) and (max-width: 4535px) {
      width: 4284px !important;
    }
    @media (min-width: 4536px) and (max-width: 4787px) {
      width: 4536px !important;
    }
    @media (min-width: 4788px) and (max-width: 5039px) {
      width: 4788px !important;
    }
    @media (min-width: 5040px) and (max-width: 5291px) {
      width: 5040px !important;
    }
    @media (min-width: 5292px) and (max-width: 5543px) {
      width: 5292px !important;
    }
    @media (min-width: 5544px) and (max-width: 5795px) {
      width: 5544px !important;
    }
    @media (min-width: 5796px) and (max-width: 6047px) {
      width: 5796px !important;
    }
  }

  .modal-content {
    margin-top: 32px;
    inset: 0 !important;
    border: none;
    background: none;

    @media (min-width: 768px) and (max-width: 1399px) {
      margin-right: 70px;
      margin-left: 70px;
    }
    @media (min-width: 768px){
      margin-bottom: 100px;
    }
  }
  .modal-open {
    overflow: hidden;
  }
`;

export default CustomStyles;
