import * as React from 'react';

import PropTypes from 'prop-types';
import Svg, { Path, Stop, Defs, LinearGradient } from 'react-native-svg';

function Gardim({ size, style }) {
	return (
		<Svg width={size * (384 / 87)} height={size} viewBox="0 0 384 87" fill="none" style={style}>
			<Path
				d="M66.96 48.264V76.04C66.96 77.576 66.4907 78.8987 65.552 80.008C64.6987 81.032 63.376 81.9707 61.584 82.824C59.4507 83.9333 56.5067 84.8293 52.752 85.512C48.9973 86.28 45.2 86.664 41.36 86.664C33.424 86.664 26.384 85.2133 20.24 82.312C14.1813 79.4107 9.44533 74.9733 6.032 69C2.61867 63.0267 0.912 55.432 0.912 46.216C0.912 37.0853 2.66133 29.5333 6.16 23.56C9.744 17.5013 14.48 12.9787 20.368 9.992C26.256 7.00533 32.6987 5.51199 39.696 5.51199C44.56 5.51199 48.8267 6.02399 52.496 7.048C56.1653 8.072 59.024 9.352 61.072 10.888C63.12 12.424 64.144 14.0027 64.144 15.624C64.144 16.7333 63.8027 17.7573 63.12 18.696C62.4373 19.5493 61.6267 20.1893 60.688 20.616C58.384 19.08 55.6533 17.672 52.496 16.392C49.3387 15.0267 45.2853 14.344 40.336 14.344C34.96 14.344 30.096 15.5387 25.744 17.928C21.392 20.3173 17.936 23.9013 15.376 28.68C12.9013 33.3733 11.664 39.2187 11.664 46.216C11.664 53.5547 12.944 59.5707 15.504 64.264C18.1493 68.872 21.7333 72.2853 26.256 74.504C30.7787 76.7227 35.856 77.832 41.488 77.832C44.56 77.832 47.4613 77.576 50.192 77.064C52.9227 76.552 55.056 75.912 56.592 75.144V51.592H37.264C37.008 51.1653 36.752 50.6107 36.496 49.928C36.24 49.16 36.112 48.3493 36.112 47.496C36.112 46.0453 36.4533 44.936 37.136 44.168C37.8187 43.3147 38.8 42.888 40.08 42.888H61.456C62.992 42.888 64.272 43.4 65.296 44.424C66.4053 45.3627 66.96 46.6427 66.96 48.264ZM107.47 78.344C111.054 78.344 113.998 78.0027 116.302 77.32C118.691 76.552 120.398 75.8267 121.422 75.144V56.584L105.55 58.248C101.113 58.5893 97.8273 59.5707 95.694 61.192C93.5607 62.8133 92.494 65.16 92.494 68.232C92.494 71.3893 93.7313 73.864 96.206 75.656C98.766 77.448 102.521 78.344 107.47 78.344ZM107.342 24.2C114.766 24.2 120.654 25.864 125.006 29.192C129.358 32.52 131.534 37.768 131.534 44.936V75.272C131.534 77.1493 131.15 78.6 130.382 79.624C129.699 80.5627 128.633 81.4587 127.182 82.312C125.134 83.4213 122.403 84.4453 118.99 85.384C115.577 86.3227 111.737 86.792 107.47 86.792C99.4487 86.792 93.2193 85.2133 88.782 82.056C84.43 78.8987 82.254 74.3333 82.254 68.36C82.254 62.8133 84.0887 58.5893 87.758 55.688C91.5127 52.7013 96.6753 50.9093 103.246 50.312L121.422 48.52V44.936C121.422 40.6693 120.142 37.5547 117.582 35.592C115.022 33.6293 111.566 32.648 107.214 32.648C103.715 32.648 100.345 33.16 97.102 34.184C93.9447 35.208 91.1287 36.36 88.654 37.64C87.9713 37.0427 87.3313 36.36 86.734 35.592C86.222 34.7387 85.966 33.8853 85.966 33.032C85.966 30.8133 87.2033 29.1067 89.678 27.912C91.982 26.7173 94.6273 25.8213 97.614 25.224C100.686 24.5413 103.929 24.2 107.342 24.2ZM160.465 36.872V57.096H150.225V37.64C150.225 35.6773 150.566 34.1413 151.249 33.032C152.017 31.8373 153.254 30.6853 154.961 29.576C157.18 28.1253 160.209 26.888 164.049 25.864C167.889 24.7547 172.156 24.2 176.849 24.2C183.676 24.2 187.089 25.9067 187.089 29.32C187.089 30.1733 186.961 30.984 186.705 31.752C186.449 32.4347 186.108 33.032 185.681 33.544C184.828 33.3733 183.718 33.2027 182.353 33.032C180.988 32.8613 179.622 32.776 178.257 32.776C174.332 32.776 170.876 33.2027 167.889 34.056C164.902 34.824 162.428 35.7627 160.465 36.872ZM150.225 51.208L160.465 52.744V84.744C160.038 84.9147 159.398 85.0853 158.545 85.256C157.692 85.512 156.753 85.64 155.729 85.64C153.937 85.64 152.572 85.2987 151.633 84.616C150.694 83.848 150.225 82.6533 150.225 81.032V51.208ZM238.17 74.888V31.88L248.41 31.752V75.272C248.41 76.8933 248.026 78.216 247.258 79.24C246.575 80.1787 245.466 81.1173 243.93 82.056C242.223 83.1653 239.791 84.1893 236.634 85.128C233.477 86.152 229.85 86.664 225.754 86.664C219.61 86.664 214.191 85.5973 209.498 83.464C204.805 81.3307 201.135 78.0027 198.49 73.48C195.845 68.872 194.522 62.9413 194.522 55.688C194.522 48.264 195.802 42.248 198.362 37.64C201.007 33.032 204.549 29.6613 208.986 27.528C213.423 25.3093 218.287 24.2 223.578 24.2C226.906 24.2 230.063 24.6693 233.05 25.608C236.037 26.5467 238.383 27.6987 240.09 29.064V38.536C238.469 36.9147 236.335 35.5493 233.69 34.44C231.13 33.2453 228.101 32.648 224.602 32.648C221.103 32.648 217.861 33.416 214.874 34.952C211.887 36.4027 209.498 38.8347 207.706 42.248C205.914 45.6613 205.018 50.2267 205.018 55.944C205.018 63.7093 206.895 69.384 210.65 72.968C214.405 76.4667 219.397 78.216 225.626 78.216C228.613 78.216 231.045 77.9173 232.922 77.32C234.885 76.6373 236.634 75.8267 238.17 74.888ZM248.41 34.312L238.17 34.44V2.056C238.597 1.88533 239.237 1.71466 240.09 1.544C241.029 1.288 241.967 1.16 242.906 1.16C244.783 1.16 246.149 1.544 247.002 2.312C247.941 2.99466 248.41 4.14666 248.41 5.768V34.312ZM266.954 7.17599C266.954 5.384 267.594 3.89067 268.874 2.696C270.154 1.416 271.733 0.775993 273.61 0.775993C275.573 0.775993 277.151 1.416 278.346 2.696C279.541 3.89067 280.138 5.384 280.138 7.17599C280.138 8.968 279.541 10.504 278.346 11.784C277.151 12.9787 275.573 13.576 273.61 13.576C271.733 13.576 270.154 12.9787 268.874 11.784C267.594 10.504 266.954 8.968 266.954 7.17599ZM268.49 51.208H278.73V84.744C278.303 84.9147 277.663 85.0853 276.81 85.256C275.957 85.512 275.018 85.64 273.994 85.64C272.202 85.64 270.837 85.2987 269.898 84.616C268.959 83.848 268.49 82.6533 268.49 81.032V51.208ZM278.73 56.2H268.49V26.12C268.917 25.9493 269.557 25.7787 270.41 25.608C271.349 25.352 272.33 25.224 273.354 25.224C275.146 25.224 276.469 25.608 277.322 26.376C278.261 27.0587 278.73 28.2533 278.73 29.96V56.2ZM346.469 44.04V58.76H336.229V44.808C336.229 40.6267 334.992 37.5547 332.517 35.592C330.128 33.6293 326.928 32.648 322.917 32.648C320.272 32.648 317.712 33.0747 315.237 33.928C312.762 34.7813 310.672 35.7627 308.965 36.872V58.76H298.725V37.384C298.725 35.6773 299.066 34.2267 299.749 33.032C300.517 31.8373 301.797 30.6853 303.589 29.576C305.893 28.1253 308.794 26.888 312.293 25.864C315.877 24.7547 319.461 24.2 323.045 24.2C327.397 24.2 331.237 24.8827 334.565 26.248C337.893 27.528 340.368 29.32 341.989 31.624C342.501 32.136 342.928 32.6053 343.269 33.032C343.61 33.4587 343.952 34.0133 344.293 34.696C344.89 35.72 345.402 37.0427 345.829 38.664C346.256 40.2853 346.469 42.0773 346.469 44.04ZM383.973 44.296V58.76H373.733V44.808C373.733 40.6267 372.538 37.5547 370.149 35.592C367.76 33.6293 364.56 32.648 360.549 32.648C357.562 32.648 354.661 33.288 351.845 34.568C349.114 35.7627 346.64 37.512 344.421 39.816L340.325 32.392C342.544 30.1733 345.445 28.2533 349.029 26.632C352.613 25.0107 356.709 24.2 361.317 24.2C365.925 24.2 369.893 24.9253 373.221 26.376C376.634 27.8267 379.28 30.0453 381.157 33.032C383.034 36.0187 383.973 39.7733 383.973 44.296ZM298.725 51.976H308.965V84.744C308.538 84.9147 307.898 85.0853 307.045 85.256C306.192 85.512 305.253 85.64 304.229 85.64C302.437 85.64 301.072 85.2987 300.133 84.616C299.194 83.848 298.725 82.6533 298.725 81.032V51.976ZM336.229 51.976H346.469V84.744C346.042 84.9147 345.36 85.0853 344.421 85.256C343.568 85.512 342.672 85.64 341.733 85.64C339.856 85.64 338.448 85.2987 337.509 84.616C336.656 83.848 336.229 82.6533 336.229 81.032V51.976ZM373.733 51.976H383.973V84.744C383.546 84.9147 382.864 85.0853 381.925 85.256C381.072 85.512 380.176 85.64 379.237 85.64C377.36 85.64 375.952 85.2987 375.013 84.616C374.16 83.848 373.733 82.6533 373.733 81.032V51.976Z"
				fill="url(#paint0_linear_85_76)"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_85_76"
					x1="213"
					y1="-36"
					x2="-6"
					y2="164"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#498356" />
					<Stop offset="0.02" stopColor="#39976A" />
					<Stop offset="0.75" stopColor="#705326" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}

Gardim.propTypes = {
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.object,
};

export default Gardim;
