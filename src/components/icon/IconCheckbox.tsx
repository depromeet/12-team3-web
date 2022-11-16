import Svg, { Props as SvgProps } from '../svg/Svg';

interface Props extends SvgProps {
  isChecked?: boolean;
}

const IconCheckbox = ({ isChecked = false }: Props) => {
  return (
    <Svg>
      {isChecked ? (
        <rect width="24" height="24" rx="6" fill="#C7C7D0" />
      ) : (
        <>
          <g clipPath="url(#clip0_1245_54761)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6V18C0 19.5913 0.632141 21.1174 1.75736 22.2426C2.88258 23.3679 4.4087 24 6 24H18C19.5913 24 21.1174 23.3679 22.2426 22.2426C23.3679 21.1174 24 19.5913 24 18V6C24 4.4087 23.3679 2.88258 22.2426 1.75736C21.1174 0.632141 19.5913 0 18 0H6ZM16.476 10.4208C16.5838 10.3058 16.6679 10.1706 16.7234 10.0231C16.779 9.87556 16.8049 9.71853 16.7998 9.56097C16.7947 9.40341 16.7586 9.24839 16.6936 9.10479C16.6285 8.96118 16.5358 8.83179 16.4208 8.724C16.3058 8.61621 16.1706 8.53214 16.0231 8.47657C15.8756 8.42101 15.7185 8.39506 15.561 8.40018C15.4034 8.40531 15.2484 8.44142 15.1048 8.50645C14.9612 8.57148 14.8318 8.66416 14.724 8.7792L11.0244 12.7272L9.1968 11.1036C8.95735 10.9045 8.6499 10.8064 8.3394 10.8298C8.0289 10.8532 7.73966 10.9964 7.53279 11.2291C7.32592 11.4619 7.21761 11.7659 7.23075 12.077C7.24389 12.3881 7.37744 12.6819 7.6032 12.8964L10.3032 15.2964C10.5368 15.5039 10.8422 15.6121 11.1544 15.598C11.4665 15.5839 11.7609 15.4486 11.9748 15.2208L16.4748 10.4208H16.476Z"
              fill="#212121"
            />
          </g>
          <defs>
            <clipPath id="clip0_1245_54761">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </>
      )}
    </Svg>
  );
};

export default IconCheckbox;
