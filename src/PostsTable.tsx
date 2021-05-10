import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

interface Column {
  id: 'id' | 'userId' | 'title' | 'body';
  label: string;
  minWidth?: number;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const columns: Column[] = [
  {
    id: 'id',
    label: 'id',
    minWidth: 10,
  },
  {
    id: 'userId',
    label: 'userId',
    minWidth: 10,
  },
  {
    id: 'title',
    label: 'title',
    minWidth: 170,
  },
  {
    id: 'body',
    label: 'body',
    minWidth: 170,
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const correctionRowsPerPageNumber = (page: number) => {
  const pageOptions = [10, 25, 100];
  if (pageOptions.includes(page)) return page;
  if (page < 10) return 10;
  else if (page < 25) {
    return 25 - page < page - 10 ? 25 : 10;
  } else if (page < 100) {
    return 100 - page < page - 25 ? 100 : 25;
  } else if (page > 100) return 100;
  return page;
};

const PostsTable = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [page, setPage] = useState(() => {
    return location.search
      ? +location.search.split('&')[0].split('=')[1] - 1
      : 0;
  });
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    return location.search
      ? correctionRowsPerPageNumber(
          +location.search.split('&')[1].split('=')[1]
        )
      : 10;
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    history.push(`/?page=${newPage + 1}&take=${rowsPerPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    history.push(`/?page=1&take=${+event.target.value}`);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const data = await res.json();
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    history.push(`/?page=${page + 1}&take=${rowsPerPage}`);
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => {
                return (
                  <TableRow
                    onClick={() => {
                      history.push(`/comment/${post.id}`);
                    }}
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={post.id}
                    style={{ cursor: 'pointer' }}
                  >
                    {columns.map((column) => {
                      const value = post[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PostsTable;
