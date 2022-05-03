""""""""""""""""""""""""""""""
" → vim configuration
""""""""""""""""""""""""""""""
set number
set relativenumber
set autoread
set smartcase

" Persists and limit vim commands history
set history=500
set undodir=~/..local/share/nvim/undo
set undofile

let mapleader=","

" Fast saving & force saving
nmap <leader>w :w!<cr>
command W w !sudo tee % > /dev/null

" Search configuration
map <space> /
map <c-space> ?
map <silent> <leader><cr> :noh<cr>

" Tab configuration
map <leader>tn :tabnew<cr>
map <leader>tc :tabclose<cr>

" Indent cofiguration
set tabstop=8 softtabstop=0 expandtab shiftwidth=4 smarttab
autocmd FileType yaml setlocal ts=2 sts=2 sw=2 expandtab

" Elixir shortcuts
augroup elixir
    autocmd FileType elixir nnoremap <c-k> :ALEGoToDefinition<cr>
augroup END

""""""""""""""""""""""""""""""
" → Plugin installation
""""""""""""""""""""""""""""""
call plug#begin('~/.local/share/nvim/plugged')
" File search / management
Plug 'scrooloose/nerdtree'
Plug 'jlanzarotta/bufexplorer'
Plug 'mileszs/ack.vim'
Plug 'nvim-lua/plenary.nvim'
Plug 'nvim-telescope/telescope.nvim'

" Misc
Plug 'terryma/vim-expand-region'
Plug 'itchyny/lightline.vim'
Plug 'maxbrunsfeld/vim-yankstack'

" Linting / Formatting
Plug 'w0rp/ale'

" Autocompletion
Plug 'Shougo/neosnippet.vim'
Plug 'Shougo/neosnippet-snippets'
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" Rust
Plug 'rust-lang/rust.vim'
Plug 'racer-rust/vim-racer'

" Elixir
Plug 'elixir-editors/vim-elixir'
Plug 'thinca/vim-ref'
Plug 'awetzel/elixir.nvim', { 'do': 'yes \| ./install.sh' }
call plug#end()

""""""""""""""""""""""""""""""
" → ALE
""""""""""""""""""""""""""""""
let g:ale_linters = {}
let g:ale_linters.elixir = ['elixir-ls']
let g:ale_linters.rust = ['rls']
let g:ale_linters.python = ['flake8']

let g:ale_fixers = {}
let g:ale_fixers.javascript = ['prettier', 'eslint']
let g:ale_fixers.typescript = ['prettier', 'eslint']
let g:ale_fixers.python = ['autopep8', 'yapf']
let g:ale_fixers.elixir = ['mix_format']
let g:ale_fix_on_save = 1

let g:ale_disable_lsp = 1
let g:ale_elixir_elixir_ls_release = '/home/lain/dev/elixir-ls/rel'

""""""""""""""""""""""""""""""
" → coc
""""""""""""""""""""""""""""""
let g:coc_global_extensions = ['coc-tsserver']
" Set internal encoding of vim, not needed on neovim, since coc.nvim using some
" unicode characters in the file autoload/float.vim
set encoding=utf-8

" TextEdit might fail if hidden is not set.
set hidden

" Some servers have issues with backup files, see #649.
set nobackup
set nowritebackup

" Give more space for displaying messages.
set cmdheight=2

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=300

" Don't pass messages to |ins-completion-menu|.
set shortmess+=c

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved.
if has("nvim-0.5.0") || has("patch-8.1.1564")
    " Recently vim can merge signcolumn and number column into one
    set signcolumn=number
else
    set signcolumn=yes
endif

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TAB>
            \ pumvisible() ? "\<C-n>" :
            \ <SID>check_back_space() ? "\<TAB>" :
            \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
    let col = col('.') - 1
    return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
if has('nvim')
    inoremap <silent><expr> <c-space> coc#refresh()
else
    inoremap <silent><expr> <c-@> coc#refresh()
endif

" Make <CR> auto-select the first completion item and notify coc.nvim to
" format on enter, <cr> could be remapped by other vim plugin
inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
            \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
    if (index(['vim','help'], &filetype) >= 0)
        execute 'h '.expand('<cword>')
    elseif (coc#rpc#ready())
        call CocActionAsync('doHover')
    else
        execute '!' . &keywordprg . " " . expand('<cword>')
    endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold * silent call CocActionAsync('highlight')

" Symbol renaming.
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code.
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
    autocmd!
    " Setup formatexpr specified filetype(s).
    autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
    " Update signature help on jump placeholder.
    autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying codeAction to the current buffer.
nmap <leader>ac  <Plug>(coc-codeaction)
" Apply AutoFix to problem on the current line.
nmap <leader>qf  <Plug>(coc-fix-current)

" Run the Code Lens action on the current line.
nmap <leader>cl  <Plug>(coc-codelens-action)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if <Plug>(coc-funcobj-i)
omap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap af <Plug>(coc-funcobj-a)
xmap ic <Plug>(coc-classobj-i)
omap ic <Plug>(coc-classobj-i)
xmap ac <Plug>(coc-classobj-a)
omap ac <Plug>(coc-classobj-a)

" Remap <C-f> and <C-b> for scroll float windows/popups.
if has('nvim-0.4.0') || has('patch-8.2.0750')
    nnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
    nnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
    inoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(1)\<cr>" : "\<Right>"
    inoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? "\<c-r>=coc#float#scroll(0)\<cr>" : "\<Left>"
    vnoremap <silent><nowait><expr> <C-f> coc#float#has_scroll() ? coc#float#scroll(1) : "\<C-f>"
    vnoremap <silent><nowait><expr> <C-b> coc#float#has_scroll() ? coc#float#scroll(0) : "\<C-b>"
endif

" Use CTRL-S for selections ranges.
" Requires 'textDocument/selectionRange' support of language server.
nmap <silent> <C-s> <Plug>(coc-range-select)
xmap <silent> <C-s> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR   :call     CocActionAsync('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings for CoCList
" Show all diagnostics.
nnoremap <silent><nowait> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions.
nnoremap <silent><nowait> <space>e  :<C-u>CocList extensions<cr>
" Show commands.
nnoremap <silent><nowait> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document.
nnoremap <silent><nowait> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols.
nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list.
nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>


let g:coc_enable_locationlist = 0
autocmd User CocLocationsChange CocList --no-quit --normal location

nmap <leader>u <Plug>(coc-references)

nnoremap Ï :CocNext<cr>
nnoremap È :CocPrev<cr>

autocmd VimEnter,ColorScheme * hi! link CocFloating CocHintFloat

""""""""""""""""""""""""""""""
" → Lightline
""""""""""""""""""""""""""""""
let g:lightline = {
            \ 'colorscheme': 'seoul256',
            \ }


""""""""""""""""""""""""""""""
" → Neosnippet
""""""""""""""""""""""""""""""
imap <C-k> <Plug>(neosnippet_expand_or_jump)
smap <C-k> <Plug>(neosnippet_expand_or_jump)
xmap <C-k> <Plug>(neosnippet_expand_target)
smap <expr><TAB> neosnippet#expandable_or_jumpable() ? 
            \ "\<Plug>(neosnippet_expand_or_jump)" : "\<TAB>"


""""""""""""""""""""""""""""""
" → YankStack
""""""""""""""""""""""""""""""
let g:yankstack_yank_keys = ['y', 'd', 'c']
nmap <leader>p <Plug>yankstack_substitute_older_paste
nmap <leader>P <Plug>yankstack_substitute_newer_paste


""""""""""""""""""""""""""""""
" → NERDTree
""""""""""""""""""""""""""""""
let g:NERDTreeWinPos = "right"
let NERDTreeShowHidden=0
let g:NERDTreeWinSize=35
map <leader>nn :NERDTreeToggle<cr>
map <leader>nb :NERDTreeFromBookmark<Space>
map <leader>nf :NERDTreeFind<cr>


"""""""""""""""""""""""""""""
" → BufExplorer
""""""""""""""""""""""""""""""
map <leader>o :BufExplorer<cr>
let g:bufExplorerShowRelativePath=1
let g:bufExplorerFindActive=1 


"""""""""""""""""""""""""""""
" → Telescope
""""""""""""""""""""""""""""""
nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>

""""""""""""""""""""""""""""""
" → vim-racer
""""""""""""""""""""""""""""""
let g:rustfmt_autosave = 1
let g:rust_fold = 1


""""""""""""""""""""""""""""""
" → vim-racer
""""""""""""""""""""""""""""""
set hidden
let g:racer_cmd = "/home/lain/.cargo/bin/racer"
let g:racer_experimental_completer = 1

""""""""""""""""""""""""""""""
" → elixir.nvim
""""""""""""""""""""""""""""""
let g:elixir_autobuild = 1
let g:elixir_showerror = 1

""""""""""""""""""""""""""""""
" → Identation and folding settings
""""""""""""""""""""""""""""""
set autoindent
set smartindent
autocmd FileType javascript setlocal shiftwidth=2 tabstop=2
augroup javascript_folding
    au!
    au FileType javascript setlocal foldmethod=syntax
augroup END
