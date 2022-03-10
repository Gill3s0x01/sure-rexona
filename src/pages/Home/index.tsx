import { useState, useEffect, useMemo } from 'react'
import { Header } from '../../components/Header'
import { Listing } from '../../components/Listing'
import { uniq } from 'lodash'
import { IListing } from '../../interfaces'
import {
  ButtonList,
  WrapBanner,
  WrapTitle,
  WrapSubImg,
  Container,
  WarpDiv,
  WrapText,
  ContextButton,
  TitleProduct,
  ButtonClear,
  WrapContainer,
} from './styles'
import { Banner } from '../../components/Banner'
import { CardGroup, Col, Row } from 'react-bootstrap'
import { useListing } from '../../hooks/useListing'

const Home = () => {
  const { data: item, error } = useListing()
  const [filteredData, setFilteredData] = useState<IListing[]>([])
  const [listItems, setItems] = useState<IListing[]>([])
  const [filterOptions, setFilterOptions] = useState([])

  const filterAction = (filter: string) => {
    setFilteredData(
      listItems.filter(item => {
        if (Array.isArray(item.category)) {
          return item.category.some(
            category => category.name.toLowerCase() === filter,
          )
        }
        return item.category.name.toLowerCase() === filter
      }),
    )
  }

  const isFilterActive = useMemo(() => {
    return listItems.length > 0
  }, [listItems])

  useEffect(() => {
    let filterItems: string[] = []
    listItems.forEach(item => {
      console.log(item.category, item, 'item.category')
      if (Array.isArray(item.category)) {
        item.category.forEach(category => filterItems.push(category.name))
      } else {
        filterItems.push(item.category.name)
      }
    })
    setFilterOptions(uniq(filterItems.map(item => item.toLowerCase())))
  }, [listItems])

  // function clear filter
  const clearFilter = () => {
    setFilteredData(listItems)
  }

  useEffect(() => {
    if (item) {
      setFilteredData(item)
      setItems(item)
    }
  }, [item])

  return useMemo(
    () => (
      <>
        <Header />
        <WrapContainer>
          <WrapBanner>
            <Banner />
          </WrapBanner>
          <div>
            <WarpDiv>
              <WrapSubImg>
                <img
                  src="https://cdn.sanity.io/images/27438tds/rexona-prod-br/0800ddba260855ca8355d70ee8892fbad3080719-750x750.png?rect=167,0,417,750&w=500&h=900&q=80&auto=format"
                  alt="imageSubtitle"
                  width="20%"
                />
              </WrapSubImg>
              <WrapTitle>
                <p>Nossos produtos</p>
              </WrapTitle>
              <WrapText>
                <p>
                  Os produtos de Rexona te dão a confiança que você precisa para
                  enfrentar seus desafios todos os dias. Clique aqui para ver
                  nossa linha completa e descubra a proteção que Não Te
                  Abandona.
                </p>
              </WrapText>
            </WarpDiv>
          </div>
          <TitleProduct>Selecione os tipos de desodorantes!!!</TitleProduct>
          <ContextButton>
            <ButtonClear onClick={clearFilter} disabled={!isFilterActive}>
              Todos
            </ButtonClear>

            {filterOptions.map((item, index) => (
              <ButtonList
                key={`${index}-${item}`}
                onClick={() => filterAction(item)}
              >
                {item}
              </ButtonList>
            ))}
          </ContextButton>

          <Container>
            <Row>
              <Col md={12}>
                <CardGroup>
                  {filteredData.map((item, index) => (
                    <Listing key={`${index}-${item.id}`} {...item} />
                  ))}
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </WrapContainer>
      </>
    ),
    [listItems, filterOptions, filteredData],
  )
}

export default Home
