import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { message, List, Avatar, Spin } from 'antd';

const LayDrawerContentNotification = ({ dataUserNotifications, handleLoadUserNotifications }) => {
  // START --- context

  // END --- context

  // START --- state

  // current page (start from 2 because the 1st is already page is loaded on Lay.jsx)
  const [page, pageSet] = React.useState(2);

  // whether if there are still any data to be displayed
  const [hasMore, hasMoreSet] = React.useState(true);

  // loadig state
  const [loading, loadingSet] = React.useState(false);

  // END --- state

  // START --- other variables

  // END --- other variables

  // START --- handler

  // handle load notification infinitely
  const handleLoadMoreNotification = async () => {
    let data = dataUserNotifications.notifications;

    loadingSet(true);

    // if all data is loaded
    if (data.length > dataUserNotifications.totalCount) {
      message.warning('These are all your notification');

      // set states
      hasMoreSet(false);
      loadingSet(false);
      return;
    }

    // else get more data
    await handleLoadUserNotifications(page, 20);

    // set states
    pageSet(_page => ++_page);
    loadingSet(false);
  };

  // END --- handler

  // START --- effect

  // END --- effect

  return (
    <InfiniteScroll
      className="drawer-notification-infinite-scroll"
      initialLoad={false}
      pageStart={0}
      loadMore={handleLoadMoreNotification}
      hasMore={!loading && hasMore}
      threshold={100}
      useWindow={false}
    >
      {/* infinite scroll content */}
      <List
        dataSource={dataUserNotifications.notifications}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>NTF</Avatar>}
              title={<a href="#">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      >
        {loading && hasMore && (
          <div className="drawer-notification-spinner">
            <Spin tip="Loading more notifications.." />
          </div>
        )}
      </List>
    </InfiniteScroll>
  );
};

export default LayDrawerContentNotification;
