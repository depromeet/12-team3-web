import { ReactElement, useState } from 'react';

import { NextPageWithLayout } from './_app.page';

import Carousel from '@/components/carousel/Carousel';
import LoadingHandler from '@/components/loading/LoadingHandler';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import DefaultAppBar from '@/components/navigation/DefaultAppBar';
import Card from '@/components/route-home/Card';
import CategorySection from '@/components/route-home/category/CategorySection';
import EmptyCard from '@/components/route-home/EmptyCard';
import RecommendSection from '@/components/route-home/RecommendSection';
import useSendFcmToken from '@/hooks/api/pushAlarm/useSendFcmToken';
import useGetUserTemplate from '@/hooks/api/template/useGetUserTemplate';
import useCurrentUserTemplate from '@/hooks/route-home/useCurrentUserTemplate';

const HomePage: NextPageWithLayout = () => {
  const [carouselWrapper, setCarouselWrapper] = useState<HTMLDivElement | null>(null);
  const { data, isLoading } = useGetUserTemplate();
  const { onCarouselIndexChange } = useCurrentUserTemplate();

  useSendFcmToken();

  return (
    <>
      <CategorySection />
      <LoadingHandler fallback={<>loading...</>} isLoading={isLoading}>
        <Carousel.Wrapper ref={setCarouselWrapper}>
          {data?.map(({ id, templateName, items }) => (
            <Carousel.Item key={id}>
              {/* TODO: 알림 관련 API 수정 이후 대응 */}
              <Card id={id} title={templateName} alarmCycle="매주 화 오후 6:00" items={items} />
            </Carousel.Item>
          ))}

          <Carousel.Item>
            <EmptyCard />
          </Carousel.Item>
        </Carousel.Wrapper>
        <Carousel.Indicator carouselWrapper={carouselWrapper} onIndexChange={onCarouselIndexChange} />
      </LoadingHandler>

      <RecommendSection />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DefaultAppBar />
      {page}
      <BottomNavigation />
    </>
  );
};

export default HomePage;
