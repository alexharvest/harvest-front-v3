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
      marginTop={marginTop}
      fontWeight={weight}
      fontSize={size}
      fontColor={color}
      // marginRight={marginRight}
      justifyContent={justifyContent}
      lineHeight={lineHeight}
      flexDirection={flexDirection}
      width={width}
    >
      {rankingValue && walletAddress ? (
        <>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
          >
            {rankingValue}
          </Label>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
            fontWeight="500"
          >
            <AddressLink
              href={`https://etherscan.io/address/${addressValue}`}
              target="blank"
              onClick={stopPropagation}
              color={color}
              fontSize="11px"
            >
              {walletAddress}
            </AddressLink>
          </Label>
        </>
      ) : balanceValue ? (
        <>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
          >
            Balance
          </Label>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
          >
            {balanceValue}
          </Label>
        </>
      ) : farmsNumber ? (
        <>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
          >
            # of Farms
          </Label>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
          >
            {farmsNumber}
          </Label>
        </>
      ) : topAllocation && tokenName && platform && chain ? (
        <>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
            justifyContent="end"
          >
            {topAllocation}
          </Label>
          <Label
            backColor={backColor}
            borderRadius={borderRadius}
            padding={padding}
            textDecoration={textDecoration}
            marginLeft={marginLeft}
            fontColor="#6988FF"
            fontSize="10px"
            justifyContent="end"
            whiteSpace="nowrap"
          >
            {`${tokenName} (${platform})`}
            <ChainImage src={chain} imgMargin={imgMargin} className="chainImage" alt="" />
          </Label>
        </>
      ) : (
        <Label
          backColor={backColor}
          borderRadius={borderRadius}
          padding={padding}
          textDecoration={textDecoration}
          marginLeft={marginLeft}
          justifyContent={justifyContent}
          width={width}
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
              marginLeft={marginLeft}
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
              color={color}
              fontSize="10px"
              fontWeight="500"
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
      marginTop={marginTop}
      fontWeight={weight}
      fontSize={size}
      fontColor={color}
      marginRight={marginRight}
    >
      <Label
        backColor={backColor}
        borderRadius={borderRadius}
        padding={padding}
        textDecoration={textDecoration}
        marginLeft={marginLeft}
      >
        {addressValue ? (
          <AddressLink
            href={`https://etherscan.io/address/${addressValue}`}
            target="blank"
            onClick={stopPropagation}
            color={color}
            fontSize="14px"
            fontWeight="400"
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
            color={color}
            fontSize="12px"
            fontWeight="500"
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
