import styled from '@emotion/styled';
import { AnimatePresence, DragHandlers, m, Variants } from 'framer-motion';

import Tag from '../tag/Tag';

import { defaultEasing } from '@/constants/motions';
import useToggle from '@/hooks/common/useToggle';

// TODO: 디자인 나올 시 적용
const HIDE_BOTTOM_POS = 80;

const RecommendSection = () => {
  const { isVisible, toggleVisible, onDragEnd } = useSectionVisible();

  const testFn = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };

  return (
    <AnimatePresence mode="wait">
      <Wrapper
        variants={RecommentSectionVariants}
        initial="show"
        animate={isVisible ? 'show' : 'hide'}
        drag="y"
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={{ top: 0, bottom: HIDE_BOTTOM_POS }}
        onDragEnd={onDragEnd}
      >
        <TestButton type="button" onClick={toggleVisible} />

        <SuggestionText>날씨가 부쩍 추워졌어요. 이런 건 어때요?</SuggestionText>

        <ItemWrapper>
          <Tag value="핫팩" onClickCancel={testFn} />
          <Tag value="겉옷" onClickCancel={testFn} />
        </ItemWrapper>
      </Wrapper>
    </AnimatePresence>
  );
};

export default RecommendSection;

const Wrapper = styled(m.section)(
  {
    position: 'fixed',
    bottom: '54px',
    left: '0',
    width: '100%',
    height: '104px',
    borderRadius: '20px 20px 0 0',
    display: 'flex',
    flexDirection: 'column',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.white,
    padding: theme.size.layoutPadding,
    paddingTop: '12px',
    paddingBottom: '20px',
  }),
);

// TODO: 디자인 나올 시 적용
const TestButton = styled.button({
  all: 'unset',
  flexShrink: 0,
  width: '20px',
  height: '4px',
  backgroundColor: 'gray',
  borderRadius: '8px',
  alignSelf: 'center',
  marginBottom: '8px',
});

const SuggestionText = styled.p({ marginBottom: '8px' }, ({ theme }) => ({
  ...theme.typographies.caption2,
  color: theme.colors.gray4,
}));

const ItemWrapper = styled.div({ display: 'flex', gap: '8px', marginBottom: '22px' });

const RecommentSectionVariants: Variants = {
  hide: {
    y: HIDE_BOTTOM_POS,
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: 'transform',
  },
  show: {
    y: '0',
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: 'transform',
  },
};

const useSectionVisible = () => {
  const [isVisible, setIsVisible, toggleVisible] = useToggle(true);

  const onDragEnd: DragHandlers['onDragEnd'] = (_, info) => {
    const shouldClose = info.velocity.y > 20 && info.offset.y > 0;
    if (shouldClose) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return { isVisible, toggleVisible, onDragEnd };
};
