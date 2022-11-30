import { ReactElement, useState } from 'react';
import styled from '@emotion/styled';

import { NextPageWithLayout } from '../_app.page';

import BottomNavigation from '@/components/navigation/BottomNavigation';
import DefaultAppBar from '@/components/navigation/DefaultAppBar';
import BottomSheet from '@/components/portal/BottomSheet';
import AddTemplateSection from '@/components/route-search/AddTemplateSection';
import CategorySection from '@/components/route-search/CategorySection';
import ListRequestSection from '@/components/route-search/ListRequestSection';
import SearchCard from '@/components/route-search/SearchCard';
import { mockCheckboxGroupOptions, mockCheckboxGroupTitle } from '@/fixtures/checkboxGroup.mock';

const Template: NextPageWithLayout = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const addTemplate = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <Wrapper>
      <Title>
        상황에 맞는
        <br />
        소지품을 추천해 드릴게요
      </Title>
      <CategorySection />
      <CardsWrapper>
        <SearchCard
          title={mockCheckboxGroupTitle}
          options={mockCheckboxGroupOptions}
          onSubmit={() => {
            setIsBottomSheetOpen(true);
          }}
        />
      </CardsWrapper>
      <ListRequestSection />
      <BottomSheet
        isShowing={isBottomSheetOpen}
        setToClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        <AddTemplateSection onComplete={addTemplate} />
      </BottomSheet>
    </Wrapper>
  );
};

Template.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DefaultAppBar />
      {page}
      <BottomNavigation />
    </>
  );
};

export default Template;

const Wrapper = styled.div`
  padding-top: 8px;
  padding-bottom: 41.5px;
`;

const Title = styled.p`
  ${({ theme }) => ({ ...theme.typographies.title2 })};
  margin-bottom: 24px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin: 16px 0 24px 0;
`;
