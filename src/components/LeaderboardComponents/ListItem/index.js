import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Container, Label, ChainImage, AddressLink } from './style'
import AnimatedDots from '../../AnimatedDots'

const ListItem = ({
  value,
  marginTop,
  marginRight,
  weight,
  size,
  color,
  platform,
  chain,
  backColor,
  borderRadius,
  padding,
  textDecoration,
  imgMargin,
  marginLeft,
  addressValue,
  showAddress,
  networkName,
  vaultAddress,
  rankingValue,
  walletAddress,
  lineHeight,
  balanceValue,
  farmsNumber,
  topAllocation,
  tokenName,
  flexDirection,
  justifyContent,
  width,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })

  const stopPropagation = event => {
    event.stopPropagation()
  }

  return isMobile ? (
    <Container
      $margintop={marginTop}
      $fontweight={weight}
      $fontsize={size}
      $fontcolor={color}
      // $marginright={marginRight}
      $justifycontent={justifyContent}
      $lineheight={lineHeight}
      $flexdirection={flexDirection}
      $width={width}
    >
      {rankingValue && walletAddress ? (
        <>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
          >
            {rankingValue}
          </Label>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
            $fontweight="500"
          >
            <AddressLink
              href={`https://debank.com/profile/${addressValue}`}
              target="blank"
              onClick={stopPropagation}
              $fontcolor={color}
              $fontsize="11px"
            >
              {walletAddress}
            </AddressLink>
          </Label>
        </>
      ) : balanceValue ? (
        <>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
          >
            Balance
          </Label>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
          >
            {balanceValue}
          </Label>
        </>
      ) : farmsNumber ? (
        <>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
          >
            # of Farms
          </Label>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
          >
            {farmsNumber}
          </Label>
        </>
      ) : topAllocation && tokenName && platform && chain ? (
        <>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
            $justifycontent="end"
          >
            {topAllocation}
          </Label>
          <Label
            $backcolor={backColor}
            $borderradius={borderRadius}
            $padding={padding}
            $textdecoration={textDecoration}
            $marginleft={marginLeft}
            $fontcolor="#6988FF"
            $fontsize="10px"
            $justifycontent="end"
            whiteSpace="nowrap"
          >
            {`${tokenName} (${platform})`}
            <ChainImage src={chain} imgMargin={imgMargin} className="chainImage" alt="" />
          </Label>
        </>
      ) : (
        <Label
          $backcolor={backColor}
          $borderradius={borderRadius}
          $padding={padding}
          $textdecoration={textDecoration}
          $marginleft={marginLeft}
          $justifycontent={justifyContent}
          $width={width}
        >
          {value === 'InfinityT%' || value === 'NaN%' || value === 'Here' || value === '0%' ? (
            <AnimatedDots />
          ) : vaultAddress ? (
            <></>
          ) : (
            value
          )}
          {chain ? (
            <ChainImage
              src={chain}
              imgMargin={imgMargin}
              className="chainImage"
              alt=""
              $marginleft={marginLeft}
            />
          ) : (
            <></>
          )}
          {networkName && vaultAddress && platform ? (
            <AddressLink
              href={
                vaultAddress !== '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
                  ? `${window.location.origin}/${networkName}/${vaultAddress}`
                  : `${window.location.origin}/${networkName}/0xa0246c9032bc3a600820415ae600c6388619a14d`
              }
              target="blank"
              onClick={stopPropagation}
              $fontcolor={color}
              $fontsize="10px"
              $fontweight="500"
            >
              {`${value} (${platform})`}
            </AddressLink>
          ) : (
            <></>
          )}
        </Label>
      )}
    </Container>
  ) : (
    <Container
      $margintop={marginTop}
      $fontweight={weight}
      $fontsize={size}
      $fontcolor={color}
      $marginright={marginRight}
    >
      <Label
        $backcolor={backColor}
        $borderradius={borderRadius}
        $padding={padding}
        $textdecoration={textDecoration}
        $marginleft={marginLeft}
      >
        {addressValue ? (
          <AddressLink
            href={`https://debank.com/profile/${addressValue}`}
            target="blank"
            onClick={stopPropagation}
            $fontcolor={color}
            $fontsize="14px"
            $fontweight="400"
          >
            {showAddress}
          </AddressLink>
        ) : (
          <></>
        )}
        {value === 'InfinityT%' || value === 'NaN%' || value === 'Here' || value === 'Apy Zero' ? (
          <AnimatedDots />
        ) : vaultAddress ? (
          <></>
        ) : (
          value
        )}
        {networkName && vaultAddress && platform ? (
          <AddressLink
            href={
              vaultAddress !== '0x1571ed0bed4d987fe2b498ddbae7dfa19519f651'
                ? `${window.location.origin}/${networkName}/${vaultAddress}`
                : `${window.location.origin}/${networkName}/0xa0246c9032bc3a600820415ae600c6388619a14d`
            }
            target="blank"
            onClick={stopPropagation}
            $fontcolor={color}
            $fontsize="12px"
            $fontweight="500"
          >
            {`${value} (${platform})`}
          </AddressLink>
        ) : (
          <></>
        )}
        {chain ? (
          <ChainImage src={chain} imgMargin={imgMargin} className="chainImage" alt="" />
        ) : (
          <></>
        )}
      </Label>
    </Container>
  )
}

export default ListItem
