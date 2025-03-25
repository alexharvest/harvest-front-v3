import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useThemeContext } from '../../../providers/useThemeContext'
import { EmptyPanel, SkeletonDiv, SkeletonItem } from './style'

const SkeletonLoader = props => {
  const { borderColorBox, highlightColor } = useThemeContext()

  return (
    <EmptyPanel borderColor={borderColorBox}>
      <SkeletonTheme baseColor="#ECECEC" highlightColor={highlightColor}>
        {[...Array(6)].map((_, index) => (
          <SkeletonItem key={index}>
            <SkeletonDiv display="flex" width="34%">
              <div>
                <Skeleton circle containerClassName="skeleton" width="28px" height="28px" />
              </div>
              <div className="skeleton-lines">
                <div>
                  <Skeleton containerClassName="skeleton" width="50%" height={10} />
                </div>
                <div>
                  <Skeleton containerClassName="skeleton" width="25%" height={10} />
                </div>
              </div>
            </SkeletonDiv>
            {[...Array(props.isPosition === 'true' ? 2 : 3)].map((empty, idx) => (
              <SkeletonDiv key={idx} display="grid" direction="column">
                <div className="skeleton-container">
                  <Skeleton containerClassName="skeleton" width="50%" height={10} />
                </div>
                <div className="skeleton-container">
                  <Skeleton containerClassName="skeleton" width="25%" height={10} />
                </div>
              </SkeletonDiv>
            ))}
          </SkeletonItem>
        ))}
      </SkeletonTheme>
    </EmptyPanel>
  )
}

export default SkeletonLoader
