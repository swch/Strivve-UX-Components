/** @jsxImportSource @emotion/react */
import React from 'react';
import Slider from 'react-slick';
import { useBase } from './withBase';
import SecurityIcon from './SecurityIcon';
import { Message } from '../types';
import MagicSliderDots from './CarouselDots';

interface AccountLinkCarouselProps {
  messages?: Message[];
}

function AccountLinkCarousel({ messages }: AccountLinkCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    rows: 1,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots: any) => {
      return <MagicSliderDots dots={dots} numDotsToShow={5} dotWidth={20} />;
    },
  };

  const { appearance } = useBase();

  return (
    <div>
      <div
        className="accountLinkProgressCard"
        css={appearance.elements?.accountLinkProgressCard}
      >
        <div style={{ width: '100%', textAlign: 'center' }}>
          <p
            className="accountLinkProgressTitle"
            css={appearance.elements?.accountLinkProgressTitle}
          >
            {'Logging in...'}
          </p>

          <Slider {...settings}>
            {messages?.map((item) => (
              <div style={{ width: 300 }}>
                <SecurityIcon />
                <p
                  className="accountLinkProgressDescription"
                  css={appearance.elements?.accountLinkProgressDescription}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <style>{`

.slick-dots,
.slick-next,
.slick-prev {
  position: absolute;
  display: block;
  padding: 0;
}

.slick-dots li button:before,
.slick-next:before,
.slick-prev:before {
  font-family: slick;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slick-next,
.slick-prev {
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: 0;
  background: 0 0;
}

.slick-next:focus,
.slick-next:hover,
.slick-prev:focus,
.slick-prev:hover {
  color: transparent;
  outline: 0;
  background: 0 0;
}

.slick-next:focus:before,
.slick-next:hover:before,
.slick-prev:focus:before,
.slick-prev:hover:before {
  opacity: 1;
}

.slick-next.slick-disabled:before,
.slick-prev.slick-disabled:before {
  opacity: 0.25;
}

.slick-next:before,
.slick-prev:before {
  font-size: 50px;
  opacity: 0.75;
  color: var(--secondaryColor);
}

.slick-prev {
  left: -25px;
}

[dir=rtl] .slick-prev {
  right: -25px;
  left: auto;
}


.slick-next:before,
[dir=rtl] .slick-prev:before {
  content: '›';
}

.slick-next {
  right: -25px;
}

[dir=rtl] .slick-next {
  right: auto;
  left: -25px;
}

.slick-prev:before,
[dir=rtl] .slick-next:before {
  content: '‹';
}

.slick-next:before,
.slick-prev:before {
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
}

.slick-prev {
    left: -25px;
}

[dir=rtl] .slick-prev {
    right: -25px;
    left: auto;
}

.slick-prev:before {
    content: '←';
}

.slick-next:before,
[dir=rtl] .slick-prev:before {
    content: '→';
}

.slick-next {
    right: -25px;
}

[dir=rtl] .slick-next {
    right: auto;
    left: -25px;
}

[dir=rtl] .slick-next:before {
    content: '←';
}

.slick-dotted.slick-slider {
    margin-bottom: 30px;
}

.slick-dots {
    bottom: -25px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;
}

.slick-dots li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0;
    padding: 0;
    cursor: pointer;
}

.slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
}

.slick-dots li button:focus,
.slick-dots li button:hover {
    outline: 0;
}

.slick-dots li button:focus:before,
.slick-dots li button:hover:before {
    opacity: 1;
}

.slick-dots li button:before {
    font-size: 6px;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: '•';
    text-align: center;
    opacity: 0.25;
    color: var(--primaryColor);
}

.slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: var(--primaryColor);
}

.slick-list,
.slick-slider,
.slick-track {
  position: relative;
  display: block;
}

.slick-loading .slick-slide,
.slick-loading .slick-track {
  visibility: hidden;
}

.slick-slider {
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  margin-bottom: 50px;
}

.slick-list {
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.slick-list:focus {
  outline: 0;
}

.slick-list.dragging {
  cursor: pointer;
  cursor: hand;
}

.slick-slider .slick-list,
.slick-slider .slick-track {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.slick-track {
  top: 0;
  left: 0;
}

.slick-track:after,
.slick-track:before {
  display: table;
  content: '';
}

.slick-track:after {
  clear: both;
}

.slick-slide {
  display: none;
  float: left;
  height: 100%;
  min-height: 1px;
}

[dir=rtl] .slick-slide {
  float: right;
}

.slick-slide img {
  display: block;
}

.slick-slide.slick-loading img {
  display: none;
}

.slick-slide.dragging img {
  pointer-events: none;
}

.slick-initialized .slick-slide {
  display: block;
}

.slick-vertical .slick-slide {
  display: block;
  height: auto;
  border: 1px solid transparent;
}

.slick-arrow.slick-hidden {
  display: none;
}


.slick-list {
  margin: -10px;
}
.slick-list .slick-slide > div {
  padding: 10px;
}


.magic-dots.slick-dots ul {
  padding: 0;
  display: flex;
  transition: all .2s;
  position: relative;
  margin: 0px; }

.magic-dots.slick-dots li.slick-active button::before {
    color: var(--primaryColor);
}

.magic-dots.slick-dots li button::before {
  transition: font-size .35s;    
  font-size: 34px;
  content: '•';
}

.magic-dots.slick-dots li.small button::before {
  font-size: 22px;
  line-height: 22px; }
      `}</style>
    </div>
  );
}

export default AccountLinkCarousel;
