import React from 'react';

interface IArrowFilter {
  fill: string;
  width: string;
  height: string;
}

const ArrowFilter: React.FC<IArrowFilter> = ({ ...props }: IArrowFilter) => {
  return (
    <svg
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width={props.width}
      height={props.height}
      viewBox='0 0 981.000000 1280.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
      <g transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)' fill={props.fill} stroke='none'>
        <path
          d='M576 12774 c-72 -23 -137 -92 -166 -178 -20 -61 -22 -82 -18 -204 8
-221 -3 -189 507 -1527 71 -187 188 -495 261 -685 291 -765 431 -1133 570
-1500 32 -85 92 -243 133 -350 306 -807 309 -814 357 -1030 55 -244 100 -659
100 -923 0 -344 -62 -843 -146 -1163 -69 -266 -121 -394 -409 -999 -31 -66
-101 -214 -155 -330 -54 -115 -124 -264 -155 -330 -31 -66 -83 -176 -115 -245
-32 -69 -98 -210 -148 -315 -127 -269 -161 -342 -192 -410 -15 -33 -53 -114
-85 -180 -31 -66 -101 -214 -155 -330 -54 -115 -124 -264 -155 -330 -31 -66
-101 -214 -155 -330 -54 -115 -124 -264 -155 -330 -237 -499 -278 -618 -279
-815 -1 -142 19 -194 93 -242 45 -29 48 -29 156 -25 183 6 329 71 690 306 127
82 329 214 450 293 121 78 327 212 457 298 131 85 286 186 345 225 60 38 171
110 248 161 77 50 356 232 620 404 264 171 539 350 610 397 636 415 689 450
1140 743 432 281 591 385 931 606 60 40 177 116 259 169 177 115 356 232 550
358 235 154 414 270 535 349 137 89 1176 766 1410 919 91 59 224 145 295 192
423 275 578 381 647 440 164 141 289 328 342 509 24 85 23 390 -3 473 -51 166
-137 299 -288 446 -104 101 -195 167 -505 364 -35 22 -225 143 -423 269 -469
298 -562 357 -670 426 -91 57 -633 403 -3265 2080 -806 514 -1579 1006 -1718
1095 -301 191 -1054 671 -1415 901 -295 188 -388 242 -506 291 -169 70 -316
90 -425 57z'
        />
      </g>
    </svg>
  );
};

export default ArrowFilter;
