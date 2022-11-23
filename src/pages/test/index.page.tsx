import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import Button from '@/components/button/Button';
import ContainedButton from '@/components/button/ContainedButton';
import IconButton from '@/components/button/IconButton';
import LabelButton from '@/components/button/LabelButton';
import Carousel from '@/components/carousel/Carousel';
import Indicator from '@/components/carousel/Indicator';
import Checkbox from '@/components/checkbox/Checkbox';
import CheckboxWithText from '@/components/checkbox/CheckboxWithText';
import Chip from '@/components/chip/Chip';
import IconAdd from '@/components/icon/IconAdd';
import IconCancel from '@/components/icon/IconCancel';
import IconCancelSmall from '@/components/icon/IconCancelSmall';
import IconCheckbox from '@/components/icon/IconCheckbox';
import IconChevron20pxUpDown from '@/components/icon/IconChevron20pxUpDown';
import IconChevron24pxRightLeft from '@/components/icon/IconChevron24pxRightLeft';
import IconChevron24pxUpDown from '@/components/icon/IconChevron24pxUpDown';
import IconHome from '@/components/icon/IconHome';
import IconInfo from '@/components/icon/IconInfo';
import IconMenu from '@/components/icon/IconMenu';
import IconMovable from '@/components/icon/IconMovable';
import IconOverflow from '@/components/icon/IconOverflow';
import IconPin from '@/components/icon/IconPin';
import IconSearch from '@/components/icon/IconSearch';
import AppBar from '@/components/navigation/AppBar';
import SearchCard from '@/components/route-search/SearchCard';
import SegmentedControl from '@/components/segmented-control/SegmentedControl';
import ToggleSwitch from '@/components/toggle/ToggleSwitch';

const BottomSheet = dynamic(() => import('@/components/portal/BottomSheet'));

const Test = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AppBar title="test" />

      <div>
        <Heading>버튼</Heading>
        <Button>테스트 버튼</Button>

        <ContainedButton size="medium">컨테인 버튼 medium</ContainedButton>
        <ContainedButton size="medium" disabled>
          컨테인 버튼 medium
        </ContainedButton>

        <ContainedButton size="large">컨테인 버튼 large</ContainedButton>
        <ContainedButton size="large" disabled>
          컨테인 버튼 large
        </ContainedButton>

        <LabelButton>라벨 버튼 small</LabelButton>
        <LabelButton disabled>라벨 버튼 small</LabelButton>
        <LabelButton size="large">라벨 버튼 large</LabelButton>
        <LabelButton size="large" disabled>
          라벨 버튼 large
        </LabelButton>

        <IconButton>
          <IconOverflow />
        </IconButton>
      </div>

      <div>
        <Heading>Toggle</Heading>
        <ToggleSwitch />
      </div>

      <div>
        <Heading>bottom sheet</Heading>

        <Button onClick={() => setIsOpen((prev) => !prev)}>bottom sheet 열기</Button>
        <BottomSheet setToClose={() => setIsOpen(false)} isShowing={isOpen}>
          <div>어쩌구저쩌구</div>
        </BottomSheet>
      </div>

      <div>
        <Heading>checkbox</Heading>
        <Checkbox
          checked={isChecked}
          onToggle={() => {
            setIsChecked((prev) => !prev);
          }}
        />
        <CheckboxWithText>이름표</CheckboxWithText>
        <Checkbox textLabel="전체 선택" />
      </div>

      <div>
        <Heading>icon</Heading>
        <IconAdd />
        <IconCancel />
        <IconCancelSmall />
        <IconCheckbox />
        <IconChevron20pxUpDown />
        <IconChevron24pxRightLeft />
        <IconChevron24pxUpDown />
        <IconHome />
        <IconMenu />
        <IconMovable />
        <IconOverflow />
        <IconPin />
        <IconSearch />
        <IconInfo />
      </div>

      <div>
        <Heading>chip</Heading>
        <Chip color="black" label="디프만 준비물" />
        <Chip label="default" />
        <Chip color="black" icon={<IconAdd />} label="text" />
      </div>

      <div>
        <Heading>carousel</Heading>

        <Carousel.Wrapper ref={carouselWrapperRef}>
          <Carousel.Item>
            <TestDiv>a</TestDiv>
          </Carousel.Item>
          <Carousel.Item>
            <TestDiv>b</TestDiv>
          </Carousel.Item>
          <Carousel.Item>
            <TestDiv>c</TestDiv>
          </Carousel.Item>
        </Carousel.Wrapper>
        <Indicator carouselWrapperRef={carouselWrapperRef} />
      </div>

      <div>
        <Heading>segment control</Heading>
        <SegmentedControl options={['요일별', '날짜별']} />
      </div>

      <CardBackground>
        <Heading>cards</Heading>
        <SearchCard title={SEARCH_CARD_DUMMY_TITLE} options={SEARCH_CARD_DUMMY_DATA} />
      </CardBackground>
    </>
  );
};

export default Test;

const Heading = styled.h2`
  border-top: solid 1px black;
`;

const TestDiv = styled.div`
  width: 100%;
  height: 300px;
  background-color: green;
`;

const CardBackground = styled.div`
  background-color: lightgray;
`;

const SEARCH_CARD_DUMMY_TITLE = '디프만 UT 준비물';
const SEARCH_CARD_DUMMY_DATA = [
  { name: '구민규', id: '1' },
  { name: '김민걸', id: '2' },
  { name: '명수찬', id: '3' },
  { name: '박한솔', id: '4' },
  { name: '오혜성', id: '5' },
  { name: '윤가빈', id: '6' },
  { name: '이영희', id: '7' },
  { name: '이은지', id: '8' },
  { name: '이종원', id: '9' },
  { name: '조성민', id: '10' },
];
