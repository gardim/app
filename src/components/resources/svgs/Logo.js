import * as React from 'react';

import PropTypes from 'prop-types';
import Svg, { Path, Stop, Defs, LinearGradient } from 'react-native-svg';

function Logo({ height, width, style }) {
	return (
		<Svg
			width={width || height}
			height={height || width}
			viewBox="0 0 512 512"
			fill="none"
			style={style}>
			<Path
				d="M210.086 60.0051C177.498 60.0051 92.9411 60.0052 42.5 152C-5.27313 239.129 18.6219 389.059 151.441 424.778C187.441 434.459 357 440 352.5 251.204"
				stroke="url(#paint0_linear_45_2)"
				strokeWidth="25"
				strokeMiterlimit="8"
				strokeLinejoin="round"
			/>
			<Path
				d="M339.497 263.553C339.638 255.031 342.74 251.917 344.032 259.61C345.058 265.723 344.183 278.592 343.787 285.151C342.31 309.669 337.531 326.504 331.883 339.066C313.499 379.952 291.017 395.113 269.736 404.577C220.355 426.536 162.852 423.331 113.829 398.145C90.5716 386.196 58.8575 366.923 40.0424 308.072C37.7765 300.984 35.7444 292.845 34.1181 283.704C21.8655 214.843 46.7257 164.687 60.351 143.607C100.929 80.8272 147.082 58.607 191.541 61.6501C194.269 61.8368 195.05 76.3084 192.427 79.2609C188.76 83.3886 181.403 79.91 177.313 80.292C166.763 81.2773 156.231 83.4848 145.754 87.2578C115.241 98.2462 84.2371 121.573 56.6856 169.519C47.6021 185.327 31.0844 220.914 37.2112 267.742C40.2378 290.875 46.8959 306.601 52.8443 318.249C66.7751 345.528 82.56 359.576 97.8309 370.305C115.243 382.538 132.873 389.456 150.478 393.76C196.254 404.951 253.317 408.077 297.895 368.04C308.792 358.253 330.811 336.208 337.274 296.826C338.942 286.662 339.302 275.314 339.497 263.553Z"
				fill="url(#paint1_linear_45_2)"
			/>
			<Path
				d="M288.727 204.745C284.36 201.671 282.463 211.28 283.187 214.319C284.662 220.504 293.142 253.812 328.277 262.372C346.376 266.781 369.279 254.465 383.619 242.264C395.228 232.387 416.25 214.588 435.244 239.571C438.463 241.591 444.05 249.19 448.371 243.989C454.586 236.509 437.223 212.322 404.011 217.999C388.496 220.651 379.754 237.541 365.426 245.664C351.097 253.786 334.161 251.935 328.809 250.061C311.723 244.077 300.621 228.136 296.238 218.873C294.089 214.333 293.095 207.82 288.727 204.745Z"
				fill="#E7835C"
			/>
			<Path
				d="M383.466 197.977C364.042 207.475 357.548 223.209 357.04 236.603C356.719 245.076 355.956 265.834 375.138 279.27C394.319 292.707 421.912 276.376 443.901 268.976C451.955 266.266 467.657 260.568 471.484 264.809C475.022 268.73 483.849 263.897 479.588 256.465C475.327 249.032 458.637 223.729 440.456 210.073C424.479 198.071 402.889 188.478 383.466 197.977Z"
				fill="url(#paint2_linear_45_2)"
			/>
			<Path
				d="M323.033 296.016C354.342 295.03 370.995 278.024 378.288 260.541C382.901 249.481 394.17 222.371 374.488 193.044C354.806 163.717 308.931 168.885 275.139 165.548C262.762 164.326 238.426 162.49 235.269 154.568C232.349 147.243 217.866 148.376 220.047 160.797C222.228 173.219 232.65 216.812 250.852 245.833C266.848 271.336 291.725 297.001 323.033 296.016Z"
				fill="url(#paint3_linear_45_2)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M336.96 23.2092C337 28.3038 333.33 32.468 328.764 32.5102L258.696 33.1582C254.13 33.2004 250.395 29.1047 250.356 24.0101C250.316 18.9155 253.985 14.7513 258.552 14.7091L328.619 14.0611C333.186 14.0189 336.92 18.1146 336.96 23.2092Z"
				fill="url(#paint4_linear_45_2)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M337.469 88.6103C337.509 93.7049 333.839 97.8691 329.273 97.9113L259.205 98.5593C254.638 98.6015 250.904 94.5058 250.864 89.4112C250.825 84.3166 254.494 80.1524 259.061 80.1102L329.128 79.4622C333.695 79.42 337.429 83.5157 337.469 88.6103Z"
				fill="url(#paint5_linear_45_2)"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M276.859 103.901C276.902 109.365 272.967 113.831 268.069 113.876L227.889 114.247C200.802 114.498 178.643 89.2091 178.397 57.7633C178.151 26.3175 199.911 0.622435 226.999 0.371928L267.178 0.000347122C272.076 -0.0449441 276.081 4.34757 276.123 9.81131L276.859 103.901Z"
				fill="url(#paint6_linear_45_2)"
			/>
			<Defs>
				<LinearGradient
					id="paint0_linear_45_2"
					x1="222.031"
					y1="48.9745"
					x2="308.121"
					y2="291.284"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#CDCDCD" />
					<Stop offset="0.6" stopColor="#6C4A31" />
				</LinearGradient>
				<LinearGradient
					id="paint1_linear_45_2"
					x1="187.667"
					y1="61.3784"
					x2="187.667"
					y2="419.225"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#D9CAB4" />
					<Stop offset="1" stopColor="#705326" />
				</LinearGradient>
				<LinearGradient
					id="paint2_linear_45_2"
					x1="457.057"
					y1="214.628"
					x2="362.585"
					y2="265.516"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#39976A" />
					<Stop offset="0.494792" stopColor="#39976A" stopOpacity="0.751705" />
					<Stop offset="0.916667" stopColor="#39976A" stopOpacity="0.54" />
				</LinearGradient>
				<LinearGradient
					id="paint3_linear_45_2"
					x1="230.335"
					y1="229.845"
					x2="383.171"
					y2="207.062"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#39976A" />
					<Stop offset="0.494792" stopColor="#39976A" stopOpacity="0.751705" />
					<Stop offset="0.916667" stopColor="#39976A" stopOpacity="0.54" />
				</LinearGradient>
				<LinearGradient
					id="paint4_linear_45_2"
					x1="250.491"
					y1="6.59888"
					x2="250.491"
					y2="34.5989"
					gradientUnits="userSpaceOnUse">
					<Stop offset="0.1" stopColor="#CFCBCB" />
					<Stop offset="1" stopColor="#464444" />
				</LinearGradient>
				<LinearGradient
					id="paint5_linear_45_2"
					x1="251"
					y1="72"
					x2="251"
					y2="100"
					gradientUnits="userSpaceOnUse">
					<Stop offset="0.1" stopColor="#CFCBCB" />
					<Stop offset="1" stopColor="#464444" />
				</LinearGradient>
				<LinearGradient
					id="paint6_linear_45_2"
					x1="227.627"
					y1="0"
					x2="227.627"
					y2="114.249"
					gradientUnits="userSpaceOnUse">
					<Stop stopColor="#E4E4E4" />
					<Stop offset="0.695" stopColor="#A8A8A8" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
}
Logo.propTypes = {
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.object,
};

export default Logo;
