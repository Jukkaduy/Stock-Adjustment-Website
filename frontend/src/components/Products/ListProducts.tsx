import React from 'react';
import CardBox from '../CardBox';
import ImageField from '../ImageField';
import dataFormatter from '../../helpers/dataFormatter';
import { saveFile } from '../../helpers/fileSaver';
import ListActionsPopover from '../ListActionsPopover';
import { useAppSelector } from '../../stores/hooks';
import { Pagination } from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';

import { hasPermission } from '../../helpers/userPermissions';

type Props = {
  products: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
};

const ListProducts = ({
  products,
  loading,
  onDelete,
  currentPage,
  numPages,
  onPageChange,
}: Props) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const hasUpdatePermission = hasPermission(currentUser, 'UPDATE_PRODUCTS');

  const corners = useAppSelector((state) => state.style.corners);
  const bgColor = useAppSelector((state) => state.style.cardsColor);

  return (
    <>
      <div className='relative overflow-x-auto p-4 space-y-4'>
        {loading && <LoadingSpinner />}
        {!loading &&
          products.map((item) => (
            <div key={item.id}>
              <CardBox hasTable isList className={'rounded shadow-none'}>
                <div
                  className={`flex rounded  dark:bg-dark-900  border  border-stone-300  items-center overflow-hidden`}
                >
                  <Link
                    href={`/products/products-view/?id=${item.id}`}
                    className={
                      'flex-1 px-4 py-6 h-24 flex divide-x-2  divide-stone-300   items-center overflow-hidden`}> dark:divide-dark-700 overflow-x-auto'
                    }
                  >
                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Name</p>
                      <p className={'line-clamp-2'}>{item.name}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Description</p>
                      <p className={'line-clamp-2'}>{item.description}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Quantity</p>
                      <p className={'line-clamp-2'}>{item.quantity}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>ExpiryDate</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.dateTimeFormatter(item.expiry_date)}
                      </p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Type</p>
                      <p className={'line-clamp-2'}>{item.type}</p>
                    </div>

                    <div className={'flex-1 px-3'}>
                      <p className={'text-xs   text-gray-500 '}>Organization</p>
                      <p className={'line-clamp-2'}>
                        {dataFormatter.organizationsOneListFormatter(
                          item.organization,
                        )}
                      </p>
                    </div>
                  </Link>
                  <ListActionsPopover
                    onDelete={onDelete}
                    itemId={item.id}
                    pathEdit={`/products/products-edit/?id=${item.id}`}
                    pathView={`/products/products-view/?id=${item.id}`}
                    hasUpdatePermission={hasUpdatePermission}
                  />
                </div>
              </CardBox>
            </div>
          ))}
        {!loading && products.length === 0 && (
          <div className='col-span-full flex items-center justify-center h-40'>
            <p className=''>No data to display</p>
          </div>
        )}
      </div>
      <div className={'flex items-center justify-center my-6'}>
        <Pagination
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={onPageChange}
        />
      </div>
    </>
  );
};

export default ListProducts;
