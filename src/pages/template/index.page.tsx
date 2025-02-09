import { ReactElement, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { NextPageWithLayout } from '../_app.page';

import LoadingHandler from '@/components/loading/LoadingHandler';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import DefaultAppBar from '@/components/navigation/DefaultAppBar';
import CategorySection from '@/components/route-search/CategorySection';
import ListRequestSection from '@/components/route-search/ListRequestSection';
import RecommendationTemplateCard from '@/components/route-search/RecommendationTemplateCard';
import { staggerOne } from '@/constants/motions';
import useGetRecCategories from '@/hooks/api/category/useGetRecCategories';
import { RecTemplate } from '@/hooks/api/template/type';
import useGetRecTemplates from '@/hooks/api/template/useGetRecTemplates';
import recordEvent from '@/lib/analytics/record';
import currentRecCategoryState from '@/store/route-search/currentRecCategory';
import selectedRecTemplateState from '@/store/route-search/selectedRecTemplate';

const TemplateAppendBottomSheet = dynamic(() => import('@/components/route-search/TemplateAppendBottomSheet'));

const Template: NextPageWithLayout = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {
    data: categories,
    currentRecCategory,
    setCurrentRecCategory,
    isLoading: isRecCategoryLoading,
  } = useRecCategories();

  const { data: templates, isRefetching: isRefetchingRecTemplates } = useGetRecTemplates();
  const setSelectedRecTemplate = useSetRecoilState(selectedRecTemplateState);

  const onRecTemplateSubmit = (templateInfo: RecTemplate) => () => {
    setSelectedRecTemplate(templateInfo);
    setIsBottomSheetOpen(true);
    recordEvent({
      action: '추천 템플릿 추가 시도',
      category: currentRecCategory?.name,
      value: templateInfo.templateName,
    });
  };

  return (
    <>
      <Wrapper>
        <Title>
          상황에 맞는
          <br />
          소지품을 추천해 드릴게요
        </Title>
        <LoadingHandler isLoading={isRecCategoryLoading} fallback={null}>
          <CategorySection
            options={categories}
            selectedCategory={currentRecCategory}
            onCategoryClick={(clickedCategory) => {
              setCurrentRecCategory(clickedCategory);
            }}
          />
        </LoadingHandler>

        <AnimatePresence mode="wait">
          <CardsWrapper
            key={currentRecCategory?.id}
            variants={staggerOne}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {templates?.map((templateInfo) => (
              <RecommendationTemplateCard
                key={`rec-template-${templateInfo.id}`}
                data={templateInfo}
                isRefetchingTemplateData={isRefetchingRecTemplates}
                submitBtnTitle="내 리스트에 추가하기"
                onSubmit={onRecTemplateSubmit(templateInfo)}
              />
            ))}
          </CardsWrapper>
        </AnimatePresence>

        <ListRequestSection />
      </Wrapper>

      <TemplateAppendBottomSheet
        isShowing={isBottomSheetOpen}
        setToClose={() => {
          setIsBottomSheetOpen(false);
        }}
      />
    </>
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

const CardsWrapper = styled(m.div)`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin: 16px 0 24px 0;
`;

const useRecCategories = () => {
  const [currentRecCategory, setCurrentRecCategory] = useRecoilState(currentRecCategoryState);
  const query = useGetRecCategories();

  useEffect(() => {
    if (query.data && currentRecCategory === null) {
      setCurrentRecCategory(query.data[0]);
    }
  }, [query.data]);

  return { ...query, currentRecCategory, setCurrentRecCategory };
};
