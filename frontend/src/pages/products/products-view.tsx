import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/products/productsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const ProductsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View products')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View products')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/products/products-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{products?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={products?.description}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Quantity</p>
            <p>{products?.quantity || 'No data'}</p>
          </div>

          <FormField label='ExpiryDate'>
            {products.expiry_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  products.expiry_date
                    ? new Date(
                        dayjs(products.expiry_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No ExpiryDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Type</p>
            <p>{products?.type ?? 'No data'}</p>
          </div>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>Organization</p>

              <p>{products?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{products?.organizations?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Sales Product</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>QuantitySold</th>

                      <th>SaleDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.sales_product &&
                      Array.isArray(products.sales_product) &&
                      products.sales_product.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/sales/sales-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='quantity_sold'>
                            {item.quantity_sold}
                          </td>

                          <td data-label='sale_date'>
                            {dataFormatter.dateTimeFormatter(item.sale_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!products?.sales_product?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/products/products-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProductsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PRODUCTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProductsView;
